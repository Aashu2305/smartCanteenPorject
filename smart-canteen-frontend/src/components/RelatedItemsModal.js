import React from 'react';
import { Link } from 'react-router-dom'; // 👈 Import Link for navigation
import './RelatedItemsModal.css';

function RelatedItemsModal({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="dialogue-box" onClick={(e) => e.stopPropagation()}>
        <div className="central-item">
          <span className="central-emoji">{item.emoji}</span>
        </div>
        
        <h2 className="dialogue-title">Related Items</h2>
        
        <div className="related-items-container">
          {item.relatedItems.map((relatedItem, index) => (
            // Each bubble is now a Link that scrolls to the product card
            <Link 
              to={`/#product-card-${relatedItem.id}`}
              state={{ timestamp: Date.now() }} // This forces our scroll hook to run
              key={index} 
              className="related-item-bubble" 
              style={{ '--i': index, '--total': item.relatedItems.length }}
              onClick={onClose} // Close the modal when an item is clicked
            >
              <span className="related-item-emoji">{relatedItem.emoji}</span>
              <span className="related-item-name">{relatedItem.name}</span>
            </Link>
          ))}
        </div>
        
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default RelatedItemsModal;