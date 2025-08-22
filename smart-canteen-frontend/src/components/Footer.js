import React from 'react';
import './Footer.css';
import { FaInstagram, FaYoutube } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section about">
          <h2 className="footer-logo">🍽️ Smart Canteen</h2>
          <p>The easiest way to order your favorite campus food. Fast, fresh, and always ready when you are.</p>
          <div className="canteen-hours">
            <p><strong>Hours:</strong> 8:00 AM - 8:00 PM</p>
          </div>
        </div>
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#menu">Menu</a></li>
            <li><a href="#!" onClick={(e) => e.preventDefault()}>About Us</a></li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>Aashutosh Yadav: +91 9523772641</p>
          <p>Shashank Singh: +91 9798713789</p>
          <p>Suprateek kar: +91 6203958833</p>
        </div>
        <div className="footer-section social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://instagram.com/yourid" target="_blank" rel="noreferrer"><FaInstagram /></a>
            <a href="https://youtube.com/yourid" target="_blank" rel="noreferrer"><FaYoutube /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 Smart Canteen. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;