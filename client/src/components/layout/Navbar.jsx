import React from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCart } from '../../context/CartContext';

const Navbar = ({ onCartClick }) => {
  const { cart } = useCart();
  
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary">
              Sushi Shop
            </h1>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#menu" className="text-gray-700 hover:text-primary">
              Menú
            </a>
            <a href="#promociones" className="text-gray-700 hover:text-primary">
              Promociones
            </a>
            <a href="#nosotros" className="text-gray-700 hover:text-primary">
              Nosotros
            </a>
          </div>

          <div className="flex items-center">
            <button 
              onClick={onCartClick}
              className="p-2 rounded-full hover:bg-gray-100 relative"
            >
              <ShoppingCartIcon className="h-6 w-6 text-gray-700" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;