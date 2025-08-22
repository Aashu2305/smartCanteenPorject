import React from 'react';
import { Link } from 'react-router-dom';
import './OrderConfirmationModal.css';
import { FaCheckCircle } from 'react-icons/fa';

function OrderConfirmationModal({ isOpen, onClose, orderId }) {
  if (!isOpen) return null;

  return (
    <div className="conf-modal-overlay">
      <div className="conf-modal-box">
        <div className="conf-modal-icon">
          <FaCheckCircle />
        </div>
        <h2 className="conf-modal-title">Order Placed Successfully!</h2>
        <p className="conf-modal-text">
          Your order #{orderId} has been received. You can track its status in your order history.
        </p>
        <div className="conf-modal-actions">
          <Link to="/my-orders" className="conf-modal-btn view-orders-btn" onClick={onClose}>
            View My Orders
          </Link>
          <button className="conf-modal-btn continue-btn" onClick={onClose}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmationModal;