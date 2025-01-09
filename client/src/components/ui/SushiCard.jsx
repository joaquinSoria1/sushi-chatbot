import React from 'react';
import { useCart } from '../../context/CartContext';

const SushiCard = ({ _id, name, description, price, pieces, image }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      _id,
      name,
      description,
      price,
      image,
      pieces,
      category: 'roll'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img 
        src={image} 
        alt={name} 
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
        <div className="mt-3 flex justify-between items-center">
          <span className="text-primary font-bold">${price}</span>
          <span className="text-sm text-gray-500">{pieces} piezas</span>
        </div>
        <button 
          onClick={handleAddToCart}
          className="mt-3 w-full bg-primary text-white py-2 rounded-md hover:bg-red-700 transition-colors"
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default SushiCard;