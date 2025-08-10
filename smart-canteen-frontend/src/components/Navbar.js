import React, { useState, useEffect, useContext, useRef } from 'react';
import './Navbar.css';
import AboutModal from './AboutModal';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaInstagram, FaYoutube, FaBars, FaTimes, FaSearch, FaUserCircle } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const mobileNavLinks = [
  { name: 'Home', href: '/' },
  { name: 'Menu', href: '/#menu' },
  { name: 'Cart', href: '#!', isCart: true },
  { name: 'About', href: '#!', isAbout: true },
];

function Navbar({ setSearchTerm }) {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { cart, toggleCart } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const profileMenuRef = useRef(null);
  const navigate = useNavigate();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileMenuRef]);

  const handleLogoClick = () => {
    // Navigate to home and scroll to top
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleHomeClick = (e) => {
    e.preventDefault();
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleMobileLinkClick = (link) => {
    setIsMobileMenuOpen(false);
    if (link.isAbout) {
        setIsAboutOpen(true);
    } else if (link.isCart) {
        toggleCart();
    } else {
        // For standard links like Home and Menu, let the browser handle navigation
    }
  };
  
  const toggleSearch = () => {
    const newSearchState = !isSearchOpen;
    setIsSearchOpen(newSearchState);
    if (!newSearchState) {
      setSearchTerm('');
    }
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''} ${isSearchOpen ? 'search-active' : ''}`}>
        <div className="nav-section-left">
          <div className="logo-circle" onClick={handleLogoClick}>🍽️</div>
        </div>
        <div className="nav-section-middle">
          <Link to="/" onClick={handleHomeClick}>Home</Link>
          <Link to="/#menu" state={{ timestamp: Date.now() }}>Menu</Link>
          <a href="#!" onClick={(e) => { e.preventDefault(); setIsAboutOpen(true); }}>About</a>
        </div>
        <div className="nav-section-right">
          <a href="https://instagram.com/yourid" target="_blank" rel="noreferrer" className="social-icon-desktop"><FaInstagram /></a>
          <a href="https://youtube.com/yourid" target="_blank" rel="noreferrer" className="social-icon-desktop"><FaYoutube /></a>
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Search..." 
              className={`search-input ${isSearchOpen ? 'open' : ''}`} 
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="search-icon-toggle" onClick={toggleSearch}>
              {isSearchOpen ? <FaTimes /> : <FaSearch />}
            </div>
          </div>
          <div className="cart-icon-wrapper" onClick={toggleCart}>
            <FaShoppingCart className="cart-icon"/>
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </div>
          <div className="profile-menu-container" ref={profileMenuRef}>
            {user ? (
              <div className="profile-widget" onClick={() => setIsProfileOpen(!isProfileOpen)}>
                <FaUserCircle className="profile-icon" />
                <span>{user.username}</span>
                {isProfileOpen && (
                  <div className="profile-dropdown">
                    <Link to="/my-orders" onClick={() => setIsProfileOpen(false)}>My Orders</Link>
                    <a href="#!" onClick={() => { logout(); setIsProfileOpen(false); }}>Logout</a>
                  </div>
                )}
              </div>
            ) : (
              <div className="profile-widget" onClick={() => setIsProfileOpen(!isProfileOpen)}>
                <FaUserCircle className="profile-icon" />
                {isProfileOpen && (
                  <div className="profile-dropdown">
                    <Link to="/login" onClick={() => setIsProfileOpen(false)}>Login</Link>
                    <Link to="/signup" onClick={() => setIsProfileOpen(false)}>Sign Up</Link>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="hamburger-icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        {mobileNavLinks.map((link, index) => (
          <a 
            key={link.name} 
            href={link.href} 
            style={{ '--animation-order': index }} 
            onClick={(e) => {
                if (link.href.startsWith('/#')) {
                    e.preventDefault();
                    navigate(link.href.substring(1)); // Programmatically navigate for smooth scroll
                }
                handleMobileLinkClick(link);
            }}
          >
            {link.name}
          </a>
        ))}
        <div className="mobile-menu-socials">
          <a href="https://instagram.com/yourid" target="_blank" rel="noreferrer"><FaInstagram /></a>
          <a href="https://youtube.com/yourid" target="_blank" rel="noreferrer"><FaYoutube /></a>
        </div>
      </div>
      {isAboutOpen && <AboutModal onClose={() => setIsAboutOpen(false)} />}
    </>
  );
}

export default Navbar;