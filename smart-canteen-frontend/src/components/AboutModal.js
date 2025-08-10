import React from "react";
import "./AboutModal.css";

function AboutModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h2>About KIIT Smart Canteen</h2>
        <p>
          Our smart canteen system removes long billing queues.  
          Order online, pay digitally, and just pick up your food.
        </p>

        <h3>Facilities 🚀</h3>
        <ul>
          <li>📱 Order from anywhere on campus</li>
          <li>💳 Multiple payment options</li>
          <li>⏳ Real-time order updates</li>
          <li>🍱 Multiple food categories</li>
        </ul>

        <h3>How to Use 🛠️</h3>
        <ol>
          <li>Select items from the menu</li>
          <li>Add them to your cart</li>
          <li>Proceed to checkout & pay</li>
          <li>Collect from the counter</li>
        </ol>

        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default AboutModal;
