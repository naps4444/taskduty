// components/ScrollToTopButton.js

import { useState, useEffect } from 'react';
import { scrollToTop } from '../../utils/scrollToTop'; // Import your scrollToTop function

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if the user has scrolled near the bottom
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    isVisible && (
        <div className='w-full flex justify-center'>
        <button
      onClick={scrollToTop}
      className="fixed bottom-4 transition mx-auto underline text-[#974FD0]"
      aria-label="Scroll to top"
    >Back To Top</button>
        </div>
    )
  );
};

export default ScrollToTopButton;
