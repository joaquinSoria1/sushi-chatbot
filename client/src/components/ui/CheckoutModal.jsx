import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const CheckoutModal = ({ isOpen, onClose, total, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: {
      street: '',
      number: '',
      apartment: '',
      notes: ''
    },
    paymentMethod: 'efectivo' // valor por defecto
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Aseguramos que todos los campos requeridos estén presentes
    if (!formData.name || !formData.phone || !formData.email || 
        !formData.address.street || !formData.address.number) {
      alert('Por favor completa todos los campos requeridos');
      setIsLoading(false);
      return;
    }
    
    try {
      // Enviamos los datos del formulario
      await onSubmit(formData);
      
    } catch (error) {
      setError(error.message || 'Ocurrió un error al procesar el pedido');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6">Finalizar Compra</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información personal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Información Personal</h3>
            <input
              type="text"
              name="name"
              placeholder="Nombre completo"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-primary"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Teléfono"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-primary"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          {/* Dirección de entrega */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Dirección de Entrega</h3>
            <input
              type="text"
              name="address.street"
              placeholder="Calle"
              value={formData.address.street}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-primary"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="address.number"
                placeholder="Número"
                value={formData.address.number}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-primary"
                required
              />
              <input
                type="text"
                name="address.apartment"
                placeholder="Departamento (opcional)"
                value={formData.address.apartment}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-primary"
              />
            </div>
            <textarea
              name="address.notes"
              placeholder="Notas adicionales para la entrega"
              value={formData.address.notes}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-primary h-20 resize-none"
            />
          </div>

          {/* Método de pago */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Método de Pago</h3>
            <div className="grid grid-cols-3 gap-4">
              {['efectivo', 'debito', 'credito'].map((method) => (
                <label
                  key={method}
                  className={`border rounded-lg p-4 text-center cursor-pointer ${
                    formData.paymentMethod === method
                      ? 'border-primary bg-red-50'
                      : 'hover:border-gray-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method}
                    checked={formData.paymentMethod === method}
                    onChange={handleInputChange}
                    className="hidden"
                  />
                  <span className="capitalize">{method}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Total y botón de confirmar */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total a pagar:</span>
              <span className="text-2xl font-bold text-primary">${total}</span>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-md transition-colors ${
                isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-primary text-white hover:bg-red-700'
              }`}
            >
              {isLoading ? 'Procesando...' : 'Confirmar Pedido'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;