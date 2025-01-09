import React, { createContext, useContext, useReducer } from 'react';
import { standardizeProduct } from '../utils/productUtils';

const CartContext = createContext();

const ACTIONS = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART'
};

// El reducer maneja todas las operaciones del carrito de manera consistente
const cartReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TO_CART: {
      const standardizedItem = standardizeProduct(action.payload, action.menuData);
      
      // Usamos una clave única para comparar productos
      const getItemKey = (item) => `${item.name}-${item.price}`;
      const itemKey = getItemKey(standardizedItem);
      
      const existingItemIndex = state.findIndex(item => 
        getItemKey(item) === itemKey
      );
      
      if (existingItemIndex >= 0) {
        const newState = [...state];
        newState[existingItemIndex] = {
          ...newState[existingItemIndex],
          quantity: newState[existingItemIndex].quantity + 1
        };
        return newState;
      }

      return [...state, standardizedItem];
    }
    
    case ACTIONS.REMOVE_FROM_CART:
      return state.filter(item => String(item.id) !== String(action.payload));
    
    case ACTIONS.UPDATE_QUANTITY:
      return state.map(item =>
        String(item.id) === String(action.payload.id)
          ? { ...item, quantity: Number(action.payload.quantity) }
          : item
      );
    
    case ACTIONS.CLEAR_CART:
      return [];
    
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addToCart = (product, menuData) => {
    dispatch({ 
      type: ACTIONS.ADD_TO_CART, 
      payload: product,
      menuData
    });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    dispatch({
      type: ACTIONS.UPDATE_QUANTITY,
      payload: { id: productId, quantity }
    });
  };

  const clearCart = () => {
    dispatch({ type: ACTIONS.CLEAR_CART });
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};