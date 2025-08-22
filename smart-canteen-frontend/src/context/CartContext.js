import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const localData = localStorage.getItem('smart-canteen-cart');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  useEffect(() => {
    localStorage.setItem('smart-canteen-cart', JSON.stringify(cart));
  }, [cart]);

  const showToast = (message) => {
    setToastMessage(message);
    setIsToastVisible(true);
    setTimeout(() => {
      setIsToastVisible(false);
    }, 3000); // Hide toast after 3 seconds
  };
  const hideToast = () => setIsToastVisible(false);

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.cartId === item.cartId);
    const currentQuantity = existingItem ? existingItem.quantity : 0;
    
    let maxStock = item.stockQuantity;
    if (item.size === "Small") maxStock = item.stockSmall;
    if (item.size === "Medium") maxStock = item.stockMedium;
    if (item.size === "Large") maxStock = item.stockLarge;

    if (currentQuantity >= maxStock) {
      showToast(`No more stock for ${item.name}${item.size ? ` (${item.size})` : ''}.`);
      return;
    }

    setCart((prevCart) => {
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.cartId === item.cartId ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const decreaseQuantity = (cartId) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.cartId === cartId);
      if (!existingItem) return prevCart;
      if (existingItem.quantity === 1) {
        return prevCart.filter((cartItem) => cartItem.cartId !== cartId);
      }
      return prevCart.map((cartItem) =>
        cartItem.cartId === cartId ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
      );
    });
  };
  
  const clearCart = () => setCart([]);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        decreaseQuantity, 
        isCartOpen,
        toggleCart,
        clearCart,
        toastMessage,
        isToastVisible,
        hideToast,
        showToast // 👈 This is the crucial missing piece
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
