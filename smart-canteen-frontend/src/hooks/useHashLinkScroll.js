import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function useHashLinkScroll() {
  const { hash, state } = useLocation();

  useEffect(() => {
    // Add a small delay to ensure the page has rendered
    const scrollTimeout = setTimeout(() => {
      if (hash) {
        const id = hash.substring(1);
        const element = document.getElementById(id);
        
        if (element) {
          // The browser will use our 'scroll-margin-top' property from the CSS
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }, 100); // 100ms delay

    // Cleanup the timeout if the component unmounts or hash changes
    return () => clearTimeout(scrollTimeout);

  }, [hash, state]);
}

export default useHashLinkScroll;
