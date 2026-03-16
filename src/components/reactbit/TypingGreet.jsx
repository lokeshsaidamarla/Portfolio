import { useEffect, useState } from "react";

const TypingGreet = () => {
  const fullText = "Oh hey, glad you stopped by.";
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= fullText.length) return;
    const timeout = setTimeout(() => {
      setDisplayed((prev) => prev + fullText[index]);
      setIndex((prev) => prev + 1);
    }, 80); // speed — lower = faster
    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <span
      style={{
        fontFamily: "'Dancing Script', cursive",
        fontWeight: 700,
      }}
    >
      {displayed}
      {index < fullText.length && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  );
};

export default TypingGreet;