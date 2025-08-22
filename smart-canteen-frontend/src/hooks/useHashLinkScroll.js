import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function useHashLinkScroll() {
  const { hash, state } = useLocation();

  useEffect(() => {
    const scrollTimeout = setTimeout(() => {
      if (hash) {
        const id = hash.substring(1);
        const element = document.getElementById(id);
        
        if (element) {
          // --- THIS IS THE SCROLL CALCULATOR ---
          
          // 1. It gets the top of the menu section.
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;

          // 2. This is the number figure you can control.
          //    It's the distance in pixels from the top of the screen.
          const pixelsFromTop = 0; // 👈 CHANGE THIS NUMBER

          // 3. The final calculation.
          const offsetPosition = elementPosition - pixelsFromTop;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    }, 100);

    return () => clearTimeout(scrollTimeout);

  }, [hash, state]);
}

export default useHashLinkScroll;
