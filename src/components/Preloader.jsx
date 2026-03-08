import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Instagram } from 'lucide-react';
import Spline from '@splinetool/react-spline';

const Preloader = ({ onFinished }) => {
  const [typedText, setTypedText] = useState('');
  const [showContent, setShowContent] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [isAssetLoaded, setIsAssetLoaded] = useState(false);
  const fullText = "harithmirza5@gmail.com";

  const handleAssetLoad = () => {
    setIsAssetLoaded(true);
  };

  // Show content shortly after mount
  useEffect(() => {
    const initialTimer = setTimeout(() => {
      setShowContent(true);
    }, 500);
    return () => clearTimeout(initialTimer);
  }, []);

  // Typing animation — marks done when complete
  useEffect(() => {
    if (!showContent) return;
    if (typedText.length < fullText.length) {
      const typingTimer = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 120);
      return () => clearTimeout(typingTimer);
    } else {
      setIsTypingDone(true);
    }
  }, [typedText, showContent, fullText]);

  // Click anywhere to dismiss
  const handleClick = useCallback(() => {
    if (!isTypingDone) return; // ignore clicks while still typing
    setFadeOut(true);
    setTimeout(onFinished, 1000);
  }, [isTypingDone, onFinished]);

  return (
    <AnimatePresence>
      {!fadeOut && (
        <motion.div
          exit={{
            opacity: 0,
            filter: 'blur(10px)',
            transition: { duration: 1, ease: 'easeInOut' }
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center dark:text-white text-slate-800 dark:bg-[#060010] bg-zinc-50 cursor-pointer select-none"
          onClick={handleClick}
        >
          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
              className="text-center relative z-10 p-4"
            >
              <div className="flex justify-center mb-2 mt-[-24px] md:mt-[-32px]">
                <div className="w-[320px] h-[180px] md:w-[480px] md:h-[260px]">
                  <Spline
                    scene="https://prod.spline.design/FcZ66SFMX1YbF-0I/scene.splinecode"
                    onLoad={handleAssetLoad}
                  />
                </div>
              </div>
              <motion.h1
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.2, ease: "easeOut" } }}
                className="text-4xl md:text-6xl font-moderniz font-bold mb-4"
              >
                MIRZA HARITH MOHD AZMI
              </motion.h1>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.8, delay: 0.5 } }}
                className="font-cascadia text-lg md:text-xl dark:text-gray-400 text-slate-500 mb-8 break-all"
              >
                <span>{typedText}</span>
                <span className="animate-blink">|</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.8 } }}
                className="flex justify-center gap-6 mb-8"
              >
                <a href="http://linkedin.com/in/mirza-harith" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="dark:hover:text-[#00ffdc] hover:text-cyan-600 transition-all duration-300 transform hover:scale-110">
                  <Linkedin size={32} />
                </a>
                <a href="https://www.instagram.com/_mirzaharith?igsh=MWZ6ajAzZWp4NmhzZg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="dark:hover:text-[#00ffdc] hover:text-cyan-600 transition-all duration-300 transform hover:scale-110">
                  <Instagram size={32} />
                </a>
              </motion.div>

              {/* Click-to-continue prompt — fades in after typing is done */}
              <AnimatePresence>
                {isTypingDone && (
                  <motion.p
                    key="click-prompt"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: [0, 1, 0.5, 1], transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" } }}
                    exit={{ opacity: 0 }}
                    className="font-cascadia text-sm dark:text-slate-500 text-slate-400 tracking-widest uppercase cursor-pointer"
                    onClick={handleClick}
                  >
                    Click anywhere to continue
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;