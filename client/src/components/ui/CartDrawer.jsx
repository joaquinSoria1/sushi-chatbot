import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useCart } from '../../context/CartContext';

const CartDrawer = ({ isOpen, onClose, onCheckout }) => {
  const { cart, removeFromCart, updateQuantity, getTotal } = useCart();

  return (
    <div
      className={`fixed inset-y-0 right-0 z-40 w-96 bg-white shadow-lg transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center bg-primary text-white">
          <h2 className="text-lg font-semibold">Carrito de Compras</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-red-700 rounded-full transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center">El carrito está vacío</p>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border-b pb-4"
                >
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-600">${item.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, Number(e.target.value))
                        }
                        className="border rounded p-1"
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">Total:</span>
            <span className="text-lg font-bold text-primary">${getTotal()}</span>
          </div>
          <button
            onClick={() => onCheckout(getTotal())}
            className="w-full bg-primary text-white py-3 rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
            disabled={cart.length === 0}
          >
            Realizar Compra
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;