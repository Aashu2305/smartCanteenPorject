import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Menu from './components/Menu';
import Cart from './components/Cart';
import Footer from './components/Footer';
import Signup from './pages/Signup';
import Login from './pages/Login';
import OrderHistory from './pages/OrderHistory'; // 👈 Import OrderHistory

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
  
  return (
    <>
      <Navbar setSearchTerm={setSearchTerm} />
      <Cart />
      <Routes>
        <Route path="/" element={<MainLayout searchTerm={searchTerm} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my-orders" element={<OrderHistory />} /> {/* 👈 Add route */}
      </Routes>
    </>
  );
}

export default App;
