import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import api from './api/axiosConfig';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Menu from './components/Menu';
import Cart from './components/Cart';
import Footer from './components/Footer';
import Signup from './pages/Signup';
import Login from './pages/Login';
import OrderHistory from './pages/OrderHistory';
import useHashLinkScroll from './hooks/useHashLinkScroll';
import Toast from './components/Toast'; // Import the Toast component
import './App.css';

// This component holds the main layout of your homepage
function MainLayout({ searchTerm, categorizedMenu, loading, error }) {
  return (
    <>
      <Home categorizedMenu={categorizedMenu} />
      <Menu searchTerm={searchTerm} categorizedMenu={categorizedMenu} loading={loading} error={error} />
      <Footer />
    </>
  );
}

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categorizedMenu, setCategorizedMenu] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useHashLinkScroll();

  // This function fetches the menu and can be passed to other components to trigger a refetch
  const fetchMenu = async () => {
    try {
      setLoading(true); // Set loading state on refetch
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
      setError(null); // Clear previous errors on success
    } catch (err) {
      setError('Failed to load menu. Is the back-end server running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []); // Runs once on initial load

  return (
    <>
      <Navbar setSearchTerm={setSearchTerm} />
      <Toast /> {/* Render the Toast component */}
      <Cart refetchMenu={fetchMenu} />
      <Routes>
        <Route path="/" element={<MainLayout searchTerm={searchTerm} categorizedMenu={categorizedMenu} loading={loading} error={error} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my-orders" element={<OrderHistory />} />
      </Routes>
    </>
  );
}

export default App;
