import React, { useState, useEffect, useContext, useMemo } from 'react';
import api from '../api/axiosConfig'; 
import { CartContext } from '../context/CartContext';
import './Menu.css';

const API_BASE_URL = api.defaults.baseURL;

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
        const response = await api.get('/api/products');
        
        const grouped = response.data.reduce((acc, product) => {
          let category = 'More Snacks';
          if (product.id <= 9) category = 'Quick Bites 🥪';
          else if (product.id >= 10 && product.id <= 11) category = 'Pizza Corner 🍕';
          else if (product.id >= 12 && product.id <= 19) category = 'Bakery & Desserts 🍰';
          else if (product.id >= 20 && product.id <= 26) category = 'Beverages 🥤';
          else if (product.id >= 27 && product.id <= 32) category = 'Chocolates & Candies 🍫';
          else if (product.id >= 33 && product.id <= 40) category = 'Packaged Goods 🍿';
          else if (product.id >= 41 && product.id <= 54) category = 'More Snacks';
          
          if (!acc[category]) acc[category] = [];
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

  const allItems = useMemo(() => Object.values(categorizedMenu).flat(), [categorizedMenu]);

  useEffect(() => {
    if (!searchTerm || allItems.length === 0) return;
    const firstMatch = allItems.find(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    if (firstMatch) {
      if (firstMatch.type !== activeTab) setActiveTab(firstMatch.type);
      setTimeout(() => {
        const element = document.getElementById(`product-card-${firstMatch.id}`);
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 150);
    }
  }, [searchTerm, allItems, activeTab]);

  const itemsInCurrentTab = useMemo(() => {
    return Object.entries(categorizedMenu).reduce((acc, [category, items]) => {
      const filteredItems = items.filter(item => item.type === activeTab);
      if (filteredItems.length > 0) acc[category] = filteredItems;
      return acc;
    }, {});
  }, [categorizedMenu, activeTab]);
  
  const handleAddToCart = (item, size = null, price = null) => {
    const itemToAdd = { ...item, price: price || item.price, size: size, cartId: size ? `${item.id}-${size}` : `${item.id}` };
    addToCart(itemToAdd);
    setAddedItemId(itemToAdd.cartId);
    setTimeout(() => setAddedItemId(null), 1500);
  };

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    const rotateY = (x / (width / 2)) * 8;
    const rotateX = (-y / (height / 2)) * 8;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  };
  
  if (loading) return <div className="menu-section"><h2 className="menu-main-heading">Loading...</h2></div>;
  if (error) return <div className="menu-section"><h2 className="menu-main-heading" style={{ color: '#e74c3c' }}>{error}</h2></div>;

  return (
    <section id="menu" className="menu-section">
      <div className="menu-heading-container">
        <h2 className="menu-main-heading">Our Full Menu</h2>
        <p className="menu-subheading">Choose your craving.</p>
      </div>
      <div className="menu-tabs">
        <button className={`tab-button ${activeTab === 'veg' ? 'active' : ''}`} onClick={() => setActiveTab('veg')}>Veg 🌿</button>
        <button className={`tab-button ${activeTab === 'non-veg' ? 'active' : ''}`} onClick={() => setActiveTab('non-veg')}>Non-Veg 🥩</button>
      </div>
      <div className="menu-content" key={activeTab}>
        {Object.entries(itemsInCurrentTab).map(([category, items]) => (
          <div key={category} className="menu-category">
            <h3 className="menu-category-title">{category}</h3>
            <div className="menu-items-grid">
              {items.map((item, index) => {
                const isPizza = category === 'Pizza Corner 🍕';
                const isOutOfStock = !isPizza && item.stockQuantity <= 0;
                const isHighlighted = searchTerm && item.name.toLowerCase().includes(searchTerm.toLowerCase());

                return (
                  <div 
                    key={item.id} 
                    id={`product-card-${item.id}`}
                    className={`menu-card ${isOutOfStock ? 'out-of-stock' : ''}`} 
                    style={{ '--animation-order': index }} 
                    onMouseMove={handleMouseMove} 
                    onMouseLeave={handleMouseLeave}
                  >
                   
                    
                    <div className="card-image-container">
                      <img src={`${API_BASE_URL}${item.imageUrl}`} alt={item.name} className="menu-item-image" />
                    </div>

                    <div className="card-info-wrapper">
                      <div className="card-header"><h4 className="menu-item-name">{item.name}</h4><div className={`veg-nonveg-badge ${item.type}`}></div></div>
                      <p className="menu-item-description">{item.description}</p>
                      
                      {isPizza ? (
                        <div className="pizza-options">
                          <div className="pizza-size"><span>Small (₹{(item.priceSmall || 0).toFixed(2)})</span><span className="stock-count">{(item.stockSmall || 0) > 0 ? `${item.stockSmall} left` : 'Sold Out'}</span><button className={addedItemId === `${item.id}-Small` ? 'added' : ''} disabled={(item.stockSmall || 0) <= 0} onClick={() => handleAddToCart(item, "Small", item.priceSmall)}>{addedItemId === `${item.id}-Small` ? 'Added ✓' : 'Add'}</button></div>
                          <div className="pizza-size"><span>Medium (₹{(item.priceMedium || 0).toFixed(2)})</span><span className="stock-count">{(item.stockMedium || 0) > 0 ? `${item.stockMedium} left` : 'Sold Out'}</span><button className={addedItemId === `${item.id}-Medium` ? 'added' : ''} disabled={(item.stockMedium || 0) <= 0} onClick={() => handleAddToCart(item, "Medium", item.priceMedium)}>{addedItemId === `${item.id}-Medium` ? 'Added ✓' : 'Add'}</button></div>
                          <div className="pizza-size"><span>Large (₹{(item.priceLarge || 0).toFixed(2)})</span><span className="stock-count">{(item.stockLarge || 0) > 0 ? `${item.stockLarge} left` : 'Sold Out'}</span><button className={addedItemId === `${item.id}-Large` ? 'added' : ''} disabled={(item.stockLarge || 0) <= 0} onClick={() => handleAddToCart(item, "Large", item.priceLarge)}>{addedItemId === `${item.id}-Large` ? 'Added ✓' : 'Add'}</button></div>
                        </div>
                      ) : (
                        <div className="card-footer">
                          <p className="menu-price">₹{(item.price || 0).toFixed(2)}</p>
                          <span className="stock-count">{item.stockQuantity > 5 ? `${item.stockQuantity} available` : (item.stockQuantity > 0 ? `Only ${item.stockQuantity} left!` : '')}</span>
                          <button className={`menu-button ${addedItemId === `${item.id}` ? 'added' : ''}`} onClick={() => handleAddToCart(item)} disabled={isOutOfStock || addedItemId === `${item.id}`}>{addedItemId === `${item.id}` ? 'Added ✓' : 'Add +'}</button>
                        </div>
                      )}
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