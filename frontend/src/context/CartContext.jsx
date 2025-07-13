import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (item) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(cartItem => 
        cartItem.id === item.id && 
        cartItem.size === item.size && 
        cartItem.color === item.color
      );

      if (existingItem) {
        return currentItems.map(cartItem =>
          cartItem.id === item.id && 
          cartItem.size === item.size && 
          cartItem.color === item.color
            ? { ...cartItem, quantity: cartItem.quantity + (item.quantity || 1) }
            : cartItem
        );
      }

      return [...currentItems, { ...item, quantity: item.quantity || 1 }];
    });
  };

  const removeFromCart = (id, size, color) => {
    setItems(currentItems => 
      currentItems.filter(item => 
        !(item.id === id && item.size === size && item.color === color)
      )
    );
  };

  const updateQuantity = (id, size, color, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id, size, color);
      return;
    }

    setItems(currentItems =>
      currentItems.map(item =>
        item.id === id && item.size === size && item.color === color
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getItemKey = (item) => `${item.id}-${item.size || ''}-${item.color || ''}`;

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getItemKey,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};