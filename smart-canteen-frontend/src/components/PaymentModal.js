import React from 'react';
import './PaymentModal.css';
import qrCodeImage from '../assets/qr_code.png';

function PaymentModal({ isOpen, onClose, totalAmount, onConfirm }) {
    if (!isOpen) return null;

    // --- IMPORTANT: Replace these with your actual details ---
    const yourUPIID = "your-upi-id@ybl";
    const yourName = "Your Canteen Name";
    // ---------------------------------------------------------

    const transactionNote = "Payment for Smart Canteen Order";
    const upiLink = `upi://pay?pa=${yourUPIID}&pn=${encodeURIComponent(yourName)}&am=${totalAmount.toFixed(2)}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;

    return (
        <div className="payment-modal-overlay" onClick={onClose}>
            <div className="payment-modal-box" onClick={(e) => e.stopPropagation()}>
                <h2 className="payment-title">Complete Your Payment</h2>
                <p className="payment-amount">
                    Total Amount: <strong>₹{totalAmount.toFixed(2)}</strong>
                </p>
                
                <div className="payment-options">
                    {/* Option 1: For Desktop Users */}
                    <div className="payment-option">
                        <h3 className="option-title">Scan from another device</h3>
                        <div className="qr-code-container">
                            <img src={qrCodeImage} alt="UPI QR Code" />
                        </div>
                    </div>

                    <div className="or-divider">OR</div>

                    {/* Option 2: For Mobile Users */}
                    <div className="payment-option">
                        <h3 className="option-title">If you're on your phone</h3>
                        <a href={upiLink} className="upi-pay-button">
                            Pay with UPI App
                        </a>
                    </div>
                </div>

                <div className="confirmation-section">
                    <p>After paying, please click the button below to confirm your order.</p>
                    <button className="payment-confirm-btn" onClick={onConfirm}>
                        I Have Paid & Confirm Order
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PaymentModal;