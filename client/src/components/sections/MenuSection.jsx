import React from 'react';
import { menuData } from '../../data/menuStore';
import { useCart } from '../../context/CartContext';
import SushiCard from '../ui/SushiCard';
import PromoCard from '../ui/PromoCard';

const MenuSection = () => {
  const { addToCart } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Promociones 🔥</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {menuData.promociones.map((promo) => (
            <PromoCard 
              key={promo.id} 
              {...promo} 
              onAddToCart={() => addToCart(promo)}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Nuestros Rolls 🍱</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuData.rolls.map((roll) => (
            <SushiCard 
              key={roll.id} 
              {...roll} 
              onAddToCart={() => addToCart(roll)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

// Agregamos el export default que faltaba
export default MenuSection;