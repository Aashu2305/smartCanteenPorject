import React, { useState, useContext } from 'react';
import api from '../api/axiosConfig';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { FaTimes, FaTrash } from 'react-icons/fa';
import PaymentModal from './PaymentModal';
import OrderConfirmationModal from './OrderConfirmationModal';
import './Cart.css';

// Get the backend's base URL to build image paths
const API_BASE_URL = api.defaults.baseURL;

function Cart({ refetchMenu }) {
  const { cart, addToCart, decreaseQuantity, removeFromCart, clearCart, isCartOpen, toggleCart, showToast } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isCheckingStock, setIsCheckingStock] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState(null);

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const taxes = subtotal * 0.05;
  const grandTotal = subtotal + taxes;

  const handleCheckoutClick = async () => {
    if (cart.length === 0) return;

    if (!user) {
      showToast("Please log in to place an order.");
      toggleCart();
      navigate('/login');
      return;
    }

    setIsCheckingStock(true);
    try {
      const stockCheckPayload = cart.map(item => ({ id: item.id, quantity: item.quantity, size: item.size }));
      await api.post('/api/orders/check-stock', stockCheckPayload);
      setIsPaymentModalOpen(true);
    } catch (error) {
      alert(`Order cannot be placed: ${error.response?.data || 'An item is out of stock.'}`);
      refetchMenu(); // Refresh menu to show updated stock
    } finally {
      setIsCheckingStock(false);
    }
  };

  const handlePaymentConfirmation = async () => {
    const orderItemsJson = JSON.stringify(cart.map(item => ({ id: item.id, name: item.name, quantity: item.quantity, price: item.price, size: item.size })));
    const orderData = { orderItems: orderItemsJson, totalPrice: grandTotal };

    try {
      const response = await api.post('/api/orders', orderData);
      
      setConfirmedOrderId(response.data.id);
      setIsPaymentModalOpen(false);
      setIsConfirmationModalOpen(true); // Show confirmation modal instead of alert

      clearCart();
      // Don't close the main cart panel, let the user do it
      refetchMenu();
    } catch (error) {
      console.error("Failed to place order:", error);
      alert(`Order failed: ${error.response?.data || 'Please try again.'}`);
    }
  };

  return (
    <>
      <div className={`cart-overlay ${isCartOpen ? 'open' : ''}`} onClick={toggleCart}></div>
      <div className={`cart-panel ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <div className="cart-header-title">
            <h2>Your Order</h2>
            {cart.length > 0 && <button className="clear-cart-btn" onClick={clearCart}>Clear All</button>}
          </div>
          <button className="close-cart-btn" onClick={toggleCart}><FaTimes /></button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is looking a little empty.</p>
            <Link to="/#menu" state={{ timestamp: Date.now() }} className="browse-menu-btn" onClick={toggleCart}>
              Start an Order
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-items-container">
              {cart.map(item => (
                <div key={item.cartId} className="cart-item-card">
                  <div className="cart-item-image-container">
                    <img src={`${API_BASE_URL}${item.imageUrl}`} alt={item.name} className="cart-item-image" />
                  </div>
                  <div className="cart-item-details">
                    <div className="cart-item-info">
                      <div className={`veg-nonveg-badge-cart ${item.type}`}></div>
                      <h3 className="cart-item-name">{item.name} {item.size && `(${item.size})`}</h3>
                    </div>
                    <p className="cart-item-unit-price">₹{item.price.toFixed(2)} / unit</p>
                    <div className="cart-item-controls">
                      <div className="quantity-controls">
                        <button onClick={() => decreaseQuantity(item.cartId)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => addToCart(item)}>+</button>
                      </div>
                      <p className="cart-item-subtotal">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                  <button className="remove-item-btn" onClick={() => removeFromCart(item.cartId)}>
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>

            <div className="order-summary-card">
              <div className="price-line"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
              <div className="price-line"><span>Taxes & Charges</span><span>₹{taxes.toFixed(2)}</span></div>
              <div className="divider"></div>
              <div className="price-line grand-total"><span>Grand Total</span><span>₹{grandTotal.toFixed(2)}</span></div>
              <button className="checkout-btn" onClick={handleCheckoutClick} disabled={isCheckingStock}>
                {isCheckingStock ? 'Checking Stock...' : 'Proceed to Pay'}
              </button>
            </div>
          </>
        )}
      </div>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        totalAmount={grandTotal}
        onConfirm={handlePaymentConfirmation}
      />
      <OrderConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={() => {
          setIsConfirmationModalOpen(false);
          toggleCart(); // Close the main cart panel when confirmation is closed
        }}
        orderId={confirmedOrderId}
      />
    </>
  );
}

export default Cart;