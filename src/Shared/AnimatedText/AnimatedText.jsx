import React, { useState, useEffect, useRef } from "react";

const AnimatedText = ({ text }) => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const [displayedText, setDisplayedText] = useState(text);
  const [isVisible, setIsVisible] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (textRef.current) observer.observe(textRef.current);

    return () => {
      if (textRef.current) observer.unobserve(textRef.current);
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      let iteration = 0;
      const id = setInterval(() => {
        setDisplayedText((prevText) =>
          prevText
            .split("")
            .map((letter, index) =>
              index < iteration ? text[index] : letters[Math.floor(Math.random() * 26)]
            )
            .join("")
        );

        if (iteration >= text.length) clearInterval(id);
        iteration += 1 / 3;
      }, 50);

      return () => clearInterval(id);
    }
  }, [isVisible, text]);

  return (
    <div
      ref={textRef}
      className="text-center font-bold tracking-wide text-blue-600 text-4xl sm:text-5xl lg:text-6xl transition duration-500"
    >
      {displayedText}
    </div>
  );
};

export default AnimatedText;
