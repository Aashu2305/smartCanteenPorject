import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Menu from './components/Menu';
import Cart from './components/Cart';
import Footer from './components/Footer';
import Signup from './pages/Signup';
import Login from './pages/Login';
import OrderHistory from './pages/OrderHistory';
import useHashLinkScroll from './hooks/useHashLinkScroll'; // 👈 This is the missing import line

function MainLayout({ searchTerm }) {
  return (
    <>
      <Home />
      <Menu searchTerm={searchTerm} />
      <Footer />
    </>
  );
}

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  useHashLinkScroll(); // This call is now valid because of the import

  return (
    <>
      <Navbar setSearchTerm={setSearchTerm} />
      <Cart />
      <Routes>
        <Route path="/" element={<MainLayout searchTerm={searchTerm} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my-orders" element={<OrderHistory />} />
      </Routes>
    </>
  );
}

export default App;
