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

const socialLinks = [
  { href: 'https://instagram.com/aashu.yv', icon: <FaInstagram /> },
  { href: 'https://youtube.com/yourid', icon: <FaYoutube /> },
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
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen) requestAnimationFrame(() => searchInputRef.current?.focus());
  }, [isSearchOpen]);

  // Go home helper
  const goHome = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Mobile menu link handler
  const handleMobileLinkClick = (link) => {
    setIsMobileMenuOpen(false);
    if (link.isAbout) setIsAboutOpen(true);
    if (link.isCart) toggleCart();
    if (link.href.startsWith('/#')) navigate(link.href);
  };

  // Toggle search
  const toggleSearch = () => {
    const newSearchState = !isSearchOpen;
    setIsSearchOpen(newSearchState);
    if (!newSearchState) setSearchTerm('');
  };

  // Logout handler
  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''} ${isSearchOpen ? 'search-active' : ''}`}>
        <div className="nav-section-left">
          <div className="logo-circle" onClick={goHome}>🍽️</div>
        </div>

        <div className="nav-section-middle">
          <Link to="/" onClick={goHome}>Home</Link>
          <Link to="/#menu" state={{ timestamp: Date.now() }}>Menu</Link>
          <a href="#!" onClick={(e) => { e.preventDefault(); setIsAboutOpen(true); }}>About</a>
          {socialLinks.map((s, i) => (
            <a key={i} href={s.href} target="_blank" rel="noreferrer" className="social-icon-desktop">
              {s.icon}
            </a>
          ))}
        </div>

        <div className="nav-section-right">
          {/* Search */}
          <div className="search-container">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search..."
              className={`search-input ${isSearchOpen ? 'open' : ''}`}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="search-icon-toggle" onClick={toggleSearch}>
              {isSearchOpen ? <FaTimes /> : <FaSearch />}
            </div>
          </div>

          {/* Cart */}
          <div className="cart-icon-wrapper" onClick={toggleCart}>
            <FaShoppingCart className="cart-icon" />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </div>

          {/* Profile */}
          <div className="profile-menu-container" ref={profileMenuRef}>
            <div className="profile-widget" onClick={() => setIsProfileOpen(!isProfileOpen)}>
              <FaUserCircle className="profile-icon" />
              {user && <span>{user.username}</span>}
              {isProfileOpen && (
                <div className="profile-dropdown">
                  {user ? (
                    <>
                      <Link to="/my-orders" onClick={() => setIsProfileOpen(false)}>My Orders</Link>
                      <a href="#!" onClick={handleLogout}>Logout</a>
                    </>
                  ) : (
                    <>
                      <Link to="/login" onClick={() => setIsProfileOpen(false)}>Login</Link>
                      <Link to="/signup" onClick={() => setIsProfileOpen(false)}>Sign Up</Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Hamburger */}
          <div className="hamburger-icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        {mobileNavLinks.map((link, index) => (
          <a
            key={link.name}
            href={link.href}
            style={{ '--animation-order': index }}
            onClick={(e) => { e.preventDefault(); handleMobileLinkClick(link); }}
          >
            {link.name}
          </a>
        ))}

        <div className="mobile-menu-divider"></div>

        <div className="mobile-menu-profile">
          {user ? (
            <>
              <div className="mobile-user-info"><FaUserCircle /><span>Welcome, {user.username}</span></div>
              <Link to="/my-orders" className="mobile-profile-link" onClick={() => setIsMobileMenuOpen(false)}>My Orders</Link>
              <a href="#!" className="mobile-profile-link" onClick={handleLogout}>Logout</a>
            </>
          ) : (
            <>
              <Link to="/login" className="mobile-profile-link" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
              <Link to="/signup" className="mobile-profile-link" onClick={() => setIsMobileMenuOpen(false)}>Sign Up</Link>
            </>
          )}
        </div>

        <div className="mobile-menu-socials">
          {socialLinks.map((s, i) => (
            <a key={i} href={s.href} target="_blank" rel="noreferrer">{s.icon}</a>
          ))}
        </div>
      </div>

      {isAboutOpen && <AboutModal onClose={() => setIsAboutOpen(false)} />}
    </>
  );
}

export default Navbar;
