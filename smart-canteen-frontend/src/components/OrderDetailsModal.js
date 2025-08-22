import React from 'react';
// 👇 1. This import is now corrected to use the named export
import { QRCodeSVG } from 'qrcode.react'; 
import './OrderDetailsModal.css';
import { FaTimes } from 'react-icons/fa';

function OrderDetailsModal({ order, onClose }) {
  if (!order) return null;

  let items = [];
  try {
    items = JSON.parse(order.orderItems);
  } catch (error) {
    console.error("Could not parse order items:", error);
  }

  const qrCodeData = JSON.stringify({
    orderId: order.id,
    total: order.totalPrice,
    date: order.orderTimestamp,
  });

  return (
    <div className="order-modal-overlay" onClick={onClose}>
      <div className="order-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="order-modal-header">
          <h2 className="order-modal-title">Order Details</h2>
          <button className="order-modal-close-btn" onClick={onClose}><FaTimes /></button>
        </div>
        <div className="order-modal-body">
          <div className="order-info-section">
            <p><strong>Order ID:</strong> #{order.id}</p>
            <p><strong>Date:</strong> {new Date(order.orderTimestamp).toLocaleString()}</p>
          </div>
          <div className="order-items-list">
            {items.map((item, index) => (
              <div key={index} className="receipt-item">
                <span className="receipt-item-name">{item.quantity}x {item.name} {item.size && `(${item.size})`}</span>
                <span className="receipt-item-price">₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="receipt-summary">
            <div className="receipt-line">
              <span>Subtotal</span>
              <span>₹{(order.totalPrice / 1.05).toFixed(2)}</span>
            </div>
            <div className="receipt-line">
              <span>Taxes (5%)</span>
              <span>₹{(order.totalPrice - (order.totalPrice / 1.05)).toFixed(2)}</span>
            </div>
            <div className="receipt-total">
              <span>Total Paid</span>
              <span>₹{order.totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <div className="qr-code-section">
            {/* 👇 2. The component is now QRCodeSVG */}
            <QRCodeSVG value={qrCodeData} size={128} bgColor="#ffffff" fgColor="#000000" level="H" />
            <p>Scan for order details</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsModal;