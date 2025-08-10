import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import './Menu.css';

function Menu({ searchTerm }) {
  const { addToCart } = useContext(CartContext);
  const [categorizedMenu, setCategorizedMenu] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedItemId, setAddedItemId] = useState(null);
  const [activeTab, setActiveTab] = useState('veg');

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/products');
        
        const grouped = response.data.reduce((acc, product) => {
          let category = 'Quick Bites 🥪';
          if (product.id >= 10 && product.id <= 11) category = 'Pizza Corner 🍕';
          else if (product.id >= 12 && product.id <= 19) category = 'Bakery & Desserts 🍰';
          else if (product.id >= 20 && product.id <= 26) category = 'Beverages 🥤';
          else if (product.id >= 27 && product.id <= 32) category = 'Chocolates & Candies 🍫';
          else if (product.id >= 33 && product.id <= 40) category = 'Packaged Goods 🍿';

          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(product);
          return acc;
        }, {});

        setCategorizedMenu(grouped);
      } catch (err) {
        setError('Failed to load menu. Is the backend server running?');
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const allItems = Object.values(categorizedMenu).flat();

  useEffect(() => {
    if (!searchTerm) return;
    const firstMatch = allItems.find(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    if (firstMatch) {
      if (firstMatch.type !== activeTab) setActiveTab(firstMatch.type);
      setTimeout(() => {
        const element = document.querySelector(`.menu-card[data-item-id="${firstMatch.id}"]`);
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 150);
    }
  }, [searchTerm, allItems, activeTab]);

  const itemsInCurrentTab = Object.entries(categorizedMenu).reduce((acc, [category, items]) => {
    const filteredItems = items.filter(item => item.type === activeTab);
    if (filteredItems.length > 0) acc[category] = filteredItems;
    return acc;
  }, {});
  
  // 👇 Logic for this function is now restored
  const handleAddToCart = (item) => {
    addToCart(item);
    setAddedItemId(item.id);
    setTimeout(() => setAddedItemId(null), 1500);
  };

  // 👇 Logic for this function is now restored
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    const rotateY = (x / (width / 2)) * 8;
    const rotateX = (-y / (height / 2)) * 8;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
  };

  // 👇 Logic for this function is now restored
  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  };
  
  if (loading) return <div className="menu-section"><h2 className="menu-main-heading">Loading Our Delicious Menu...</h2></div>;
  if (error) return <div className="menu-section"><h2 className="menu-main-heading" style={{ color: '#e74c3c' }}>{error}</h2></div>;

  return (
    <section id="menu" className="menu-section">
      <div className="menu-heading-container">
        <h2 className="menu-main-heading">Our Full Menu</h2>
        <p className="menu-subheading">Choose your craving.</p>
      </div>
      <div className="menu-tabs">
        <button className={`tab-button ${activeTab === 'veg' ? 'active' : ''}`} onClick={() => setActiveTab('veg')}>Veg Delights 🌿</button>
        <button className={`tab-button ${activeTab === 'non-veg' ? 'active' : ''}`} onClick={() => setActiveTab('non-veg')}>Non-Veg Feast 🥩</button>
      </div>
      <div className="menu-content" key={activeTab}>
        {Object.entries(itemsInCurrentTab).map(([category, items]) => (
          <div key={category} className="menu-category">
            <h3 className="menu-category-title">{category}</h3>
            <div className="menu-items-grid">
              {items.map((item, index) => {
                const isHighlighted = searchTerm && item.name.toLowerCase().includes(searchTerm.toLowerCase());
                return (
                  <div key={item.id} data-item-id={item.id} className={`menu-card ${isHighlighted ? 'highlighted' : ''}`} style={{ '--animation-order': index }} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                    <div className="card-image-placeholder"><span className="card-bg-emoji">{item.emoji}</span></div>
                    <div className="card-info-wrapper">
                      <div className="card-header"><h4 className="menu-item-name">{item.name}</h4><div className={`veg-nonveg-badge ${item.type}`}></div></div>
                      <p className="menu-item-description">{item.description}</p>
                      <div className="tags-container">{item.tags.split(',').map(tag => <span key={tag} className="tag-pill">{tag}</span>)}</div>
                      <div className="card-footer"><p className="menu-price">₹{item.price}</p><button className={`menu-button ${addedItemId === item.id ? 'added' : ''}`} onClick={() => handleAddToCart(item)} disabled={addedItemId === item.id}>{addedItemId === item.id ? 'Added ✓' : 'Add +'}</button></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Menu;