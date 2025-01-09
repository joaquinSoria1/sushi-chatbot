import React from 'react';
import { useCart } from '../../context/CartContext';

const PromoCard = ({ _id, name, description, price, originalPrice, image }) => {
  const { addToCart } = useCart();
  const discount = Math.round(((originalPrice - price) / originalPrice) * 100);

  const handleAddToCart = () => {
    addToCart({
      _id,
      name,
      description,
      price,
      image,
      category: 'promotion'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border-2 border-primary">
      <div className="h-48 relative">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded-md">
          {discount}% OFF
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-primary font-bold text-xl">${price}</span>
          <span className="text-gray-500 line-through text-sm">
            ${originalPrice}
          </span>
        </div>
        <button
          onClick={handleAddToCart}
          className="mt-3 w-full bg-primary text-white py-2 rounded-md hover:bg-red-700 transition-colors"
        >
          ¡Lo quiero!
        </button>
      </div>
    </div>
  );
};

export default PromoCard;