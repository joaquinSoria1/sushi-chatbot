import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const SuccessModal = ({ isOpen, onClose, trackingNumber }) => {
  // Si el modal no está abierto, no renderizamos nada
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 transform transition-all">
        {/* Contenedor principal con animación */}
        <div className="text-center">
          {/* Ícono de check animado */}
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-6">
            <CheckCircleIcon 
              className="h-16 w-16 text-green-500 animate-[bounce_1s_ease-in-out]" 
              aria-hidden="true" 
            />
          </div>

          {/* Título y mensaje */}
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            ¡Pedido Confirmado!
          </h3>
          
          <div className="space-y-3">
            <p className="text-gray-600">
              Tu pedido ha sido procesado exitosamente.
            </p>
            
            {/* Número de seguimiento */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Número de seguimiento:</p>
              <p className="text-lg font-semibold text-primary">{trackingNumber}</p>
            </div>
            
            <p className="text-sm text-gray-500">
              Guarda este número para realizar el seguimiento de tu pedido.
            </p>
          </div>

          {/* Botón de cerrar */}
          <button
            onClick={onClose}
            className="mt-8 w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-red-700 transition-colors duration-200"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;