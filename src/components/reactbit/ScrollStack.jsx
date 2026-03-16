import { useLayoutEffect, useRef, useCallback } from "react";
import Lenis from "lenis";

export const ScrollStackItem = ({ children, itemClassName = "" }) => (
  <div
    className={`scroll-stack-card relative w-full h-80 my-8 p-12 rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border origin-top will-change-transform ${itemClassName}`}
    style={{
      backfaceVisibility: "hidden",
      transformStyle: "preserve-3d",
    }}
  >
    {children}
  </div>
);

const ScrollStack = ({
  children,
  className = "",
  itemDistance = 180,
  itemScale = 0.03,
  itemStackDistance = 60,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = true,
  onStackComplete,
}) => {
  const scrollerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lenisRef = useRef(null);
  const cardsRef = useRef([]);
  const stackCompletedRef = useRef(false);
  // Track last known scroll position to avoid redundant updates
  const lastScrollTopRef = useRef(-1);

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === "string" && value.includes("%")) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }, []);

  const calculateProgress = useCallback((scrollTop, start, end) => {
    if (scrollTop <= start) return 0;
    if (scrollTop >= end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight,
      };
    }
    const scroller = scrollerRef.current;
    return {
      scrollTop: scroller.scrollTop,
      containerHeight: scroller.clientHeight,
    };
  }, [useWindowScroll]);

  const getElementOffset = useCallback(
    (element) => {
      if (useWindowScroll) {
        // Use offsetTop chain instead of getBoundingClientRect to get
        // document-relative position, which is stable and scroll-independent.
        let top = 0;
        let el = element;
        while (el) {
          top += el.offsetTop;
          el = el.offsetParent;
        }
        return top;
      }
      return element.offsetTop;
    },
    [useWindowScroll]
  );

  const updateCardTransforms = useCallback(
    (scrollTop) => {
      const { containerHeight } = getScrollData();
      // Use the passed-in scrollTop (from Lenis) for accuracy instead of
      // re-reading window.scrollY, which can be stale during the same frame.
      const currentScrollTop =
        scrollTop !== undefined ? scrollTop : getScrollData().scrollTop;

      // Skip update if scroll position hasn't changed (prevents jitter on stop)
      if (currentScrollTop === lastScrollTopRef.current) return;
      lastScrollTopRef.current = currentScrollTop;

      const stackPositionPx = parsePercentage(stackPosition, containerHeight);
      const scaleEndPositionPx = parsePercentage(
        scaleEndPosition,
        containerHeight
      );

      const endElement = document.querySelector(".scroll-stack-end");
      const endElementTop = endElement ? getElementOffset(endElement) : 0;

      cardsRef.current.forEach((card, i) => {
        const cardTop = getElementOffset(card);

        // --- Scale animation ---
        const triggerStart =
          cardTop - stackPositionPx - itemStackDistance * i;
        const triggerEnd = cardTop - scaleEndPositionPx;

        const scaleProgress = calculateProgress(
          currentScrollTop,
          triggerStart,
          triggerEnd
        );
        const targetScale = baseScale + i * itemScale;
        const scale = 1 - scaleProgress * (1 - targetScale);

        // --- Rotation ---
        const rotation = rotationAmount
          ? i * rotationAmount * scaleProgress
          : 0;

        // --- Blur ---
        let blur = 0;
        if (blurAmount) {
          let topCardIndex = 0;
          for (let j = 0; j < cardsRef.current.length; j++) {
            const jTop = getElementOffset(cardsRef.current[j]);
            const jStart =
              jTop - stackPositionPx - itemStackDistance * j;
            if (currentScrollTop >= jStart) topCardIndex = j;
          }
          if (i < topCardIndex) {
            blur = (topCardIndex - i) * blurAmount;
          }
        }

        // --- Pinning / translateY ---
        // The pin window: card sticks between pinStart and pinEnd
        const pinStart =
          cardTop - stackPositionPx - itemStackDistance * i;
        const pinEnd = endElementTop - containerHeight / 2;

        let translateY = 0;

        if (currentScrollTop > pinStart) {
          // Clamp to pinEnd so the card doesn't drift past the stack
          const clampedScroll = Math.min(currentScrollTop, pinEnd);
          translateY =
            clampedScroll - cardTop + stackPositionPx + itemStackDistance * i;
        }

        // Apply all transforms in a single style mutation (one reflow)
        card.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale}) rotate(${rotation}deg)`;
        card.style.filter = blur ? `blur(${blur}px)` : "";
      });

      // Fire onStackComplete callback
      const lastIndex = cardsRef.current.length - 1;
      if (lastIndex >= 0) {
        const lastCard = cardsRef.current[lastIndex];
        const lastCardTop = getElementOffset(lastCard);
        const triggerStart =
          lastCardTop -
          parsePercentage(stackPosition, containerHeight) -
          itemStackDistance * lastIndex;
        const triggerEnd = endElementTop - containerHeight / 2;
        const isActive =
          currentScrollTop >= triggerStart &&
          currentScrollTop <= triggerEnd;

        if (isActive && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        }
        if (!isActive && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    },
    [
      getScrollData,
      getElementOffset,
      parsePercentage,
      calculateProgress,
      stackPosition,
      scaleEndPosition,
      baseScale,
      itemScale,
      itemStackDistance,
      rotationAmount,
      blurAmount,
      onStackComplete,
    ]
  );

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;

    const cards = Array.from(
      useWindowScroll
        ? document.querySelectorAll(".scroll-stack-card")
        : scroller.querySelectorAll(".scroll-stack-card")
    );

    cardsRef.current = cards;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.transformOrigin = "top center";
      card.style.willChange = "transform, filter";
    });

    // ─── Lenis setup ───────────────────────────────────────────────────────
    // Lenis already drives a RAF loop. We hook into its scroll event to get
    // the interpolated (smooth) scrollTop value, then update transforms once
    // per frame. We do NOT add a separate native 'scroll' listener because
    // that would fire at a different time in the same frame and cause jitter.
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      touchMultiplier: 2,
      lerp: 0.1,
    });

    // Lenis provides the current interpolated scroll value here
    lenis.on("scroll", ({ scroll }) => {
      updateCardTransforms(scroll);
    });

    const raf = (time) => {
      lenis.raf(time);
      animationFrameRef.current = requestAnimationFrame(raf);
    };
    animationFrameRef.current = requestAnimationFrame(raf);

    lenisRef.current = lenis;

    // Run once on mount to set initial positions correctly
    updateCardTransforms(window.scrollY);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemDistance, useWindowScroll]);

  // Re-run transforms when updateCardTransforms reference changes (prop change)
  useLayoutEffect(() => {
    updateCardTransforms(window.scrollY);
  }, [updateCardTransforms]);

  const containerClassName = useWindowScroll
    ? `relative w-full ${className}`
    : `relative w-full h-full overflow-y-auto ${className}`;

  return (
    <div className={containerClassName} ref={scrollerRef}>
      <div className="scroll-stack-inner pt-[20vh] px-20 pb-[50rem] min-h-screen">
        {children}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
};

export default ScrollStack;