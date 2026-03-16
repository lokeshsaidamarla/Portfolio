import React, { useState } from "react";
import { motion } from "framer-motion";
import ScrollFloat from './reactbit/ScrollFloat';

const certifications = [
  {
    title: "Salesforce Certified Platform Developer I",
    image: "/certifications/sdp.png",
    link: "https://trailhead.salesforce.com/en/credentials/certification-detail-print/?searchString=T8p1u2eXNF/UezjcpdgXFw10JTsfM+G4FYwdxaB2iEYY0AgjXwuy2mrajLPcZdH0",
  },
  {
    title: "Oracle Cloud Certified AI Foundations Associate",
    image: "/certifications/oaf.png",
    link: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=4EF668AC162D032A04CBDEED067B86E4E3A6343A5CCA34DCF1E866D21DB84D43",
  },
  {
    title: "Automation Anywhere Certified Essentials RPA Professional - 2023",
    image: "/certifications/aapra.png",
    link: "https://certificates.automationanywhere.com/3385875e-7893-4816-bea5-42f6632491e6#acc.gqDcZXiz",
  },
  {
    title: "Salesforce Ai Associate",
    image: "/certifications/saa.png",
    link: "https://trailhead.salesforce.com/en/credentials/certification-detail-print/?searchString=T8p1u2eXNF/UezjcpdgXFw10JTsfM+G4FYwdxaB2iEYY0AgjXwuy2mrajLPcZdH0",
  },
  {
    title: "Red Hat Certified Enterprise Application Developer",
    image: "/certifications/red.png",
    link: "https://rhtapps.redhat.com/verify?certId=240-185-785",
  },
  {
    title: "Essentials Automation Professional Certification",
    image: "/certifications/eap.png",
    link: "https://certificates.automationanywhere.com/82c3fb18-b71f-4d97-b35e-2b6c333effc6#acc.CnmgW9z5",
  },
  {
    title: "GitHub Foundations",
    image: "/certifications/git.png",
    link: "https://www.credly.com/badges/b1863e06-568f-4259-9eb9-f9b8d7d42eef/print",
  },
];

// Duplicate once for seamless infinite loop
const allCerts = [...certifications, ...certifications];

const CertificationCarousel = () => {
  const [paused, setPaused] = useState(false);

  return (
    <div id="certifications" className="w-full overflow-hidden">
      <style>{`
        @keyframes scroll-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .cert-track {
          display: flex;
          gap: 1.5rem;
          width: max-content;
          animation: scroll-left 20s linear infinite;
        }
        .cert-track.paused {
          animation-play-state: paused;
        }
      `}</style>

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-10 text-center text-3xl lg:text-4xl pt-20"
        style={{
          fontFamily: "Roboto Flex",
          fontWeight: 600,
          letterSpacing: "0.08em"
        }}
      >
        <ScrollFloat
          animationDuration={1}
          ease="back.inOut(2)"
          scrollStart="center bottom+=50%"
          scrollEnd="bottom bottom-=40%"
          stagger={0.03}
        >
          CERTIFICATIONS
        </ScrollFloat>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center text-base sm:text-lg md:text-xl font-medium text-white mb-5"
      >
       Curious about a credential? Click any certificate to open its official verification page.
      </motion.p>

      <div
        className={`cert-track${paused ? " paused" : ""}`}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {allCerts.map((cert, index) => (
          <div
            key={index}
            className="min-w-[140px] sm:min-w-[170px] md:min-w-[200px] lg:min-w-[230px] xl:min-w-[250px] flex-shrink-0 bg-[#00000022] rounded-2xl border border-white/20 p-3 transition-transform duration-300 hover:scale-105"
          >
            <a href={cert.link} target="_blank" rel="noopener noreferrer">
              <img
                src={cert.image}
                alt={cert.title}
                className="w-full h-[120px] sm:h-[140px] md:h-[160px] lg:h-[180px] xl:h-[195px] object-contain mb-2 rounded-lg"
              />
              <p className="text-xs sm:text-sm md:text-base font-semibold text-center text-white leading-snug">
                {cert.title}
              </p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificationCarousel;