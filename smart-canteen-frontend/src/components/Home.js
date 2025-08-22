import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import RelatedItemsModal from './RelatedItemsModal'; 
import { Link } from 'react-router-dom';


const featuredItems = {
  burger: {
    name: 'Burger',
    emoji: '🍔',
    relatedItems: [
      { id: 10, name: 'Pizza', emoji: '🍕' },
      { id: 36, name: 'Cup Noodles', emoji: '🍜' },
      { id: 5, name: 'Veg Roll', emoji: '🌯' },
    ]
  },
  fries: {
    name: 'Fries',
    emoji: '🍟',
    relatedItems: [
      { id: 1, name: 'Samosa', emoji: '🥟' },
      { id: 3, name: 'Veg Patties', emoji: '🥧' },
      { id: 7, name: 'Sandwich', emoji: '🥪' },
    ]
  },
  soda: {
    name: 'Soda',
    emoji: '🥤',
    relatedItems: [
      { id: 22, name: 'Cold Coffee', emoji: '🧋' },
      { id: 26, name: 'Mango Juice', emoji: '🥭' },
      { id: 23, name: 'Lassi', emoji: '🥛' },
    ]
  },
  donut: {
    name: 'Donut',
    emoji: '🍩',
    relatedItems: [
      { id: 12, name: 'Pastry', emoji: '🍰' },
      { id: 13, name: 'Muffin', emoji: '🧁' },
      { id: 16, name: 'Cheesecake', emoji: '🧀' },
    ]
  },
};

function Home() {
  const [offsetY, setOffsetY] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.pageYOffset);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const { clientX, clientY } = e;
    const { offsetWidth, offsetHeight, offsetLeft, offsetTop } = heroRef.current;
    const x = clientX - (offsetLeft + offsetWidth / 2);
    const y = clientY - (offsetTop + offsetHeight / 2);
    const tiltFactor = 3;
    const rotateY = (x / (offsetWidth / 2)) * tiltFactor-2;
    const rotateX = (x / (offsetWidth / 2)) * tiltFactor-2;
    const visualElement = heroRef.current.querySelector('.hero-visual');
    if (visualElement) {
      visualElement.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  };



  const handleSmoothScroll = (e) => {
    e.preventDefault();
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <section
        id="home"
        className="hero-section"
        ref={heroRef}
        onMouseMove={handleMouseMove}
        // onMouseLeave={handleMouseLeave}
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


          <Link to="/#menu" state={{ timestamp: Date.now() }} className="hero-cta-button">
            Explore Menu
          </Link>


        </div>

        <div
          className="hero-visual"
          style={{ transform: `translateY(${offsetY * 0.3}px)` }}
        >
          <div className="floating-icon icon-1" onClick={() => setSelectedItem(featuredItems.burger)}>🍔</div>
          <div className="floating-icon icon-2" onClick={() => setSelectedItem(featuredItems.fries)}>🍟</div>
          <div className="floating-icon icon-3" onClick={() => setSelectedItem(featuredItems.soda)}>🥤</div>
          <div className="floating-icon icon-4" onClick={() => setSelectedItem(featuredItems.donut)}>🍩</div>
        </div>
      </section>

      {selectedItem && (
        <RelatedItemsModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </>
  );
}

export default Home;