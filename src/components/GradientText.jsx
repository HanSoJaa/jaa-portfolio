import { useState, useEffect } from "react";

// Define the texts to be displayed alternately
const TEXTS_TO_TYPE = ["Software Engineer", "Tech Enthusiast", "Lifelong Learner"];

// Main component
export default function LoopingGradientText({
  className = "",
  colors = ["#ffaa40", "#9c40ff", "#ffaa40"],
  animationSpeed = 3,
  typingSpeed = 100,
  deletingSpeed = 75,
  pauseDuration = 2000,
}) {
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const currentText = TEXTS_TO_TYPE[textIndex];

      // Logic to delete text
      if (isDeleting) {
        if (displayedText.length > 0) {
          setDisplayedText(currentText.substring(0, displayedText.length - 1));
        } else {
          setIsDeleting(false);
          setTextIndex((prevIndex) => (prevIndex + 1) % TEXTS_TO_TYPE.length);
        }
      }
      // Logic to type text
      else {
        if (displayedText.length < currentText.length) {
          setDisplayedText(currentText.substring(0, displayedText.length + 1));
        } else {
          // Pause briefly after typing is complete
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      }
    };

    const typingInterval = isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(handleTyping, typingInterval);

    // Clear timeout on component unmount
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, textIndex, deletingSpeed, typingSpeed, pauseDuration]);

  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
    animationDuration: `${animationSpeed}s`,
  };

  return (
    // Main container is made transparent, removed classes like 'backdrop-blur'
    <div className={`relative flex w-full items-center justify-start ${className}`}>
      {/* Text with gradient */}
      <div
        className="inline-block relative z-2 text-left text-xl lg:text-3xl font-medium text-transparent bg-cover animate-gradient"
        style={{
          ...gradientStyle,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          backgroundSize: "300% 100%",
        }}
      >
        {/* Display the text currently being typed */}
        <span>{displayedText}</span>

        {/* Typing cursor */}
        <span
          className="ml-1 inline-block h-5 w-0.5 animate-blink dark:bg-white bg-slate-800"
          style={{ height: "1.25em", verticalAlign: "bottom" }}
        />
      </div>
    </div>
  );
}