import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import IngredientModal from './IngredientModal';

// Data for all clickable, featured items in the hero section
const featuredItems = {
  burger: {
    name: 'Classic Burger',
    emoji: '🍔',
    ingredients: [
      { name: 'Toasted Brioche ', emoji: '🍞' },
      { name: '100% chicken ', emoji: '🥩' },
      { name: 'Cheddar Cheese', emoji: '🧀' },
      { name: 'Crisp Lettuce', emoji: '🥬' },
      { name: 'Special Sauce', emoji: '🥫' },
      { name: 'Fresh Tomato', emoji: '🍅' },
    ],
  },
  fries: {
    name: 'Crispy Fries',
    emoji: '🍟',
    ingredients: [
      { name: 'Idaho Potatoes', emoji: '🥔' },
      { name: 'Sea Salt', emoji: '🧂' },
      { name: 'Vegetable Oil', emoji: '🌿' },
    ],
  },
  soda: {
    name: 'Fizzy Soda',
    emoji: '🥤',
    ingredients: [
      { name: 'Carbonated Water', emoji: '💧' },
      { name: 'Natural Fruit Flavor', emoji: '🍓' },
      { name: 'A Hint of Sweetness', emoji: '🍬' },
    ],
  },
  donut: {
    name: 'Glazed Donut',
    emoji: '🍩',
    ingredients: [
      { name: 'Fluffy Dough', emoji: '☁️' },
      { name: 'Sweet Sugar Glaze', emoji: '✨' },
      { name: 'Rainbow Sprinkles', emoji: '🎉' },
    ],
  },
};

function Home() {
  // State for the parallax scroll effect
  const [offsetY, setOffsetY] = useState(0);
  // State to manage which item's ingredient modal is open
  const [selectedItem, setSelectedItem] = useState(null);
  // Ref for the hero section to calculate mouse position
  const heroRef = useRef(null);

  // Effect to handle scroll events for parallax
  useEffect(() => {
    const handleScroll = () => setOffsetY(window.pageYOffset);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handler for the 3D mouse-tilt effect
  const handleMouseMove = (e) => {
    if (!heroRef.current) return;

    const { clientX, clientY } = e;
    const { offsetWidth, offsetHeight, offsetLeft, offsetTop } = heroRef.current;
    
    const x = clientX - (offsetLeft + offsetWidth / 2);
    const y = clientY - (offsetTop + offsetHeight / 2);
    
    const tiltFactor = 15;
    const rotateY = (x / (offsetWidth / 2)) * tiltFactor;
    const rotateX = (-1 * y / (offsetHeight / 2)) * tiltFactor;
    
    const visualElement = heroRef.current.querySelector('.hero-visual');
    if (visualElement) {
      visualElement.style.transform = `
        perspective(1000px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg)
      `;
    }
  };

  // Handler to reset the tilt effect when the mouse leaves
  const handleMouseLeave = () => {
    const visualElement = heroRef.current.querySelector('.hero-visual');
    if (visualElement) {
      visualElement.style.transform = `
        perspective(1000px) 
        rotateX(0deg) 
        rotateY(0deg)
      `;
    }
  };

  return (
    <>
      <section
        id="home"
        className="hero-section"
        ref={heroRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="hero-content">
          <h1 className="hero-headline">
            Your Canteen, <br />
            One Click Away.
          </h1>
          <p className="hero-subheadline">
            Freshly prepared meals, snacks, and beverages. Order online with the
            Smart Canteen and skip the queue forever.
          </p>
          <a href="#menu" className="hero-cta-button">
            Explore Menu
          </a>
        </div>

        <div
          className="hero-visual"
          style={{ transform: `translateY(${offsetY * 0.3}px)` }}
        >
          <div
            className="floating-icon icon-1"
            onClick={() => setSelectedItem(featuredItems.burger)}
          >
            🍔
          </div>
          <div
            className="floating-icon icon-2"
            onClick={() => setSelectedItem(featuredItems.fries)}
          >
            🍟
          </div>
          <div
            className="floating-icon icon-3"
            onClick={() => setSelectedItem(featuredItems.soda)}
          >
            🥤
          </div>
          <div
            className="floating-icon icon-4"
            onClick={() => setSelectedItem(featuredItems.donut)}
          >
            🍩
          </div>
        </div>
      </section>

      {/* Conditionally render the ingredient modal */}
      {selectedItem && (
        <IngredientModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </>
  );
}

export default Home;