import React, { useState, useContext } from 'react';
import api from '../api/axiosConfig';
import { CartContext } from '../context/CartContext';
import { FaTimes } from 'react-icons/fa';
import PaymentModal from './PaymentModal'; // 👇 1. Corrected the import name
import './Cart.css';

function Cart() {
  const { cart, addToCart, decreaseQuantity, clearCart, isCartOpen, toggleCart } = useContext(CartContext);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false); // 👇 2. Renamed state for clarity

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const taxes = subtotal * 0.05;
  const grandTotal = subtotal + taxes;

  const handlePaymentConfirmation = async () => {
    if (cart.length === 0) return;

    const orderItemsJson = JSON.stringify(
      cart.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        emoji: item.emoji,
        type: item.type
      }))
    );
    
    const orderData = {
      orderItems: orderItemsJson,
      totalPrice: grandTotal
    };

    try {
      await api.post('/api/orders', orderData);
      
      alert('Your order has been placed successfully!');
      clearCart();
      setIsPaymentModalOpen(false); // Close the payment modal
      toggleCart(); // Close the cart panel
    } catch (error) {
      console.error("Failed to place order:", error);
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        alert('You must be logged in to place an order.');
      } else {
        alert('There was a problem placing your order. Please try again.');
      }
    }
  };

  const handleCheckoutClick = () => {
    if (cart.length > 0) {
      setIsPaymentModalOpen(true); // Open the payment modal
    }
  };

  return (
    <>
      <div 
        className={`cart-overlay ${isCartOpen ? 'open' : ''}`}
        onClick={toggleCart}
      ></div>
      
      <div className={`cart-panel ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <div className="cart-header-title">
            <h2>Your Order</h2>
            {cart.length > 0 && (
              <button className="clear-cart-btn" onClick={clearCart}>
                Clear All
              </button>
            )}
          </div>
          <button className="close-cart-btn" onClick={toggleCart}>
            <FaTimes />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty.</p>
            <a href="#menu" className="browse-menu-btn" onClick={toggleCart}>
              Start Ordering
            </a>
          </div>
        ) : (
          <>
            <div className="cart-items-container">
              {cart.map(item => (
                <div key={item.id} className="cart-item-card">
                  <div className="item-image-placeholder">
                    <span className="item-emoji">{item.emoji}</span>
                  </div>
                  <div className="item-details">
                    <div className="item-info">
                      <div className={`veg-nonveg-badge-cart ${item.type}`}></div>
                      <h3 className="item-name">{item.name}</h3>
                    </div>
                    <div className="item-controls">
                      <div className="quantity-controls">
                        <button onClick={() => decreaseQuantity(item.id)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => addToCart(item)}>+</button>
                      </div>
                      <p className="item-subtotal">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-summary-card">
              <div className="price-line">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="price-line">
                <span>Taxes & Charges</span>
                <span>₹{taxes.toFixed(2)}</span>
              </div>
              <div className="divider"></div>
              <div className="price-line grand-total">
                <span>Grand Total</span>
                <span>₹{grandTotal.toFixed(2)}</span>
              </div>
              <button className="checkout-btn" onClick={handleCheckoutClick}>
                Proceed to Pay
              </button>
            </div>
          </>
        )}
      </div>

      {/* 👇 3. Render the new PaymentModal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        totalAmount={grandTotal}
        onConfirm={handlePaymentConfirmation}
      />
    </>
  );
}

export default Cart;