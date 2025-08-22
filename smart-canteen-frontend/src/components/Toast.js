import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import './Toast.css';
import { FaTimesCircle } from 'react-icons/fa';

function Toast() {
  const { toastMessage, isToastVisible, hideToast } = useContext(CartContext);

  if (!isToastVisible) {
    return null;
  }

  return (
    <div className="toast-container">
      <div className="toast-icon">
        <FaTimesCircle />
      </div>
      <p className="toast-message">{toastMessage}</p>
      <button className="toast-close-btn" onClick={hideToast}>&times;</button>
    </div>
  );
}

export default Toast;