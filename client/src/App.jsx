import React, { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import MenuSection from './components/sections/MenuSection';
import CartDrawer from './components/ui/CartDrawer';
import CheckoutModal from './components/ui/CheckoutModal';
import Chatbot from './components/ui/Chatbot';
import { CartProvider, useCart } from './context/CartContext';
import { orderService } from './services/orderService';

function App() {
  // Estados principales para controlar modales y el proceso de compra
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [orderTotal, setOrderTotal] = useState(0);
  const [trackingNumber, setTrackingNumber] = useState('');

  // Componente interno que tiene acceso al contexto del carrito
  const AppContent = () => {
    const { cart, getTotal, clearCart } = useCart();

    // Manejador para abrir el carrito
    const handleCartClick = () => {
      setIsCartOpen(true);
    };

    // Manejador para iniciar el proceso de checkout
    const handleCheckout = (total) => {
      setOrderTotal(total);
      setIsCartOpen(false);
      setIsCheckoutOpen(true);
    };

    // Manejador para procesar la orden
    const handleOrder = async (formData) => {
      try {
        // Asegurarnos de que el carrito no esté vacío
        if (cart.length === 0) {
          alert('El carrito está vacío');
          return;
        }
    
        const orderData = {
          items: cart.map(item => ({
            id: item.id,
            name: item.name,
            price: Number(item.price),
            quantity: Number(item.quantity || 1),
            description: item.description || ''
          })),
          customerInfo: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: {
              street: formData.address.street,
              number: formData.address.number,
              apartment: formData.address.apartment || '',
              notes: formData.address.notes || ''
            }
          },
          total: getTotal(),
          paymentMethod: formData.paymentMethod
        };
    
        const response = await orderService.create(orderData);
        
        if (response.success) {
          setTrackingNumber(response.order.trackingNumber);
          setIsCheckoutOpen(false);
          setIsSuccessOpen(true);
          clearCart();
        }
      } catch (error) {
        console.error('Error al procesar el pedido:', error);
        let errorMessage = 'Error al procesar el pedido. Por favor, intenta nuevamente.';
        
        if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        }
        
        alert(errorMessage);
      }
    };
    

    // Renderizamos los componentes principales de la aplicación
    return (
      <>
        <Navbar onCartClick={handleCartClick} />
        <Hero />
        <MenuSection />
        <CartDrawer 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)}
          onCheckout={handleCheckout}
        />
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          total={orderTotal}
          onSubmit={handleOrder}
        />
        {/* Modal de éxito - puedes crear este componente si lo necesitas */}
        {isSuccessOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4">¡Pedido Confirmado!</h2>
              <p>Tu número de seguimiento es: {trackingNumber}</p>
              <button
                onClick={() => setIsSuccessOpen(false)}
                className="mt-4 w-full bg-primary text-white py-2 rounded hover:bg-red-700"
              >
                Aceptar
              </button>
            </div>
          </div>
        )}
        <Chatbot onCartClick={handleCartClick} />
      </>
    );
  };

  // Envolvemos toda la aplicación con el CartProvider para tener acceso al contexto del carrito
  return (
    <CartProvider>
      <div className="min-h-screen">
        <AppContent />
      </div>
    </CartProvider>
  );
}

export default App;