import React from 'react';
import './IngredientModal.css';

function IngredientModal({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="dialogue-box" onClick={(e) => e.stopPropagation()}>
        <div className="central-item">
          <span className="central-emoji">{item.emoji}</span>
        </div>
        
        <h2 className="dialogue-title">Deconstructed {item.name}</h2>
        
        <div className="ingredients-orbit-container">
          {item.ingredients.map((ingredient, index) => (
            <div 
              key={index} 
              className="ingredient-bubble" 
              // Inline style to position each bubble in a circle
              style={{ '--i': index, '--total': item.ingredients.length }}
            >
              <span className="ingredient-emoji">{ingredient.emoji}</span>
              <span className="ingredient-name">{ingredient.name}</span>
            </div>
          ))}
        </div>
        
        <button className="close-btn" onClick={onClose}>
          Assemble!
        </button>
      </div>
    </div>
  );
}

export default IngredientModal;