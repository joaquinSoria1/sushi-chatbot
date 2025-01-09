import React, { useState, useRef, useEffect } from 'react';
import { PaperAirplaneIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useCart } from '../../context/CartContext';
import { aiService } from '../../services/aiService';
import { menuData } from '../../data/menuStore'; // Agregamos esta importación

const Chatbot = ({ onCartClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: '¡Hola! Soy el asistente virtual de Sushi Shop. ¿En qué puedo ayudarte?'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { addToCart } = useCart();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAddToCart = (product) => {
    const completeProduct = menuData.findProduct(product.name) || product;
    addToCart(completeProduct);
    
    setMessages(prev => [...prev, {
      type: 'bot',
      text: `¡${completeProduct.name} agregado al carrito!`,
      options: ['Seguir comprando', 'Ir al carrito', 'Ver menú']
    }]);
  };

  const handleCartRedirect = () => {
    setIsOpen(false);
    setTimeout(() => {
      onCartClick();
    }, 100);
  };

  // Función para procesar las respuestas de la IA
  const handleAIResponse = async (userMessage) => {
    try {
      setIsTyping(true);
      const aiResponse = await aiService.getChatResponse(userMessage);
      
      if (aiResponse.includes('[MOSTRAR_MENU]')) {
        setMessages(prev => [...prev, {
          type: 'bot',
          text: aiResponse.replace('[MOSTRAR_MENU]', ''),
          showMenu: true
        }]);
      } else if (aiResponse.includes('[AGREGAR_AL_CARRITO:')) {
        const match = aiResponse.match(/\[AGREGAR_AL_CARRITO:(.*?)\]/);
        if (match) {
          const productName = match[1].trim();
          const product = menuData.rolls.find(r => 
            r.name.toLowerCase() === productName.toLowerCase()
          ) || menuData.promociones.find(p => 
            p.name.toLowerCase() === productName.toLowerCase()
          );
          
          if (product) {
            handleAddToCart(product);
          }
        }
        setMessages(prev => [...prev, {
          type: 'bot',
          text: aiResponse.replace(/\[AGREGAR_AL_CARRITO:.*?\]/, '')
        }]);
      } else {
        setMessages(prev => [...prev, { type: 'bot', text: aiResponse }]);
      }
    } catch (error) {
      console.error('Error al procesar respuesta de IA:', error);
      setMessages(prev => [...prev, {
        type: 'bot',
        text: 'Lo siento, tuve un problema al procesar tu solicitud. ¿Podrías intentarlo de nuevo?'
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  // Función para manejar el envío de mensajes
  const handleSendMessage = async (text = inputValue) => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { type: 'user', text }]);
    setInputValue('');
    await handleAIResponse(text);
  };

  // Función para renderizar el menú interactivo
  const renderMenu = () => (
    <div className="mt-4 space-y-4">
      <div className="space-y-3">
        <h4 className="font-bold text-gray-900">🍱 Nuestros Rolls:</h4>
        {menuData.rolls.map((roll) => (
          <div key={roll.id} className="bg-gray-50 p-3 rounded-lg">
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                <img 
                  src={roll.image} 
                  alt={roll.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h5 className="font-semibold">{roll.name}</h5>
                  <p className="text-sm text-gray-600">{roll.description}</p>
                  <p className="text-sm">{roll.pieces} piezas</p>
                </div>
              </div>
              <span className="font-bold text-primary">${roll.price}</span>
            </div>
            <div className="mt-2 flex justify-between">
              <button
                onClick={() => handleAddToCart(roll)}
                className="text-sm text-primary hover:underline"
              >
                Agregar al pedido
              </button>
              <button
                onClick={handleCartRedirect}
                className="text-sm text-primary hover:underline"
              >
                Ir al carrito
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <h4 className="font-bold text-gray-900">🎉 Promociones:</h4>
        {menuData.promociones.map((promo) => (
          <div key={promo.id} className="bg-gray-50 p-3 rounded-lg">
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                <img 
                  src={promo.image} 
                  alt={promo.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h5 className="font-semibold">{promo.name}</h5>
                  <p className="text-sm text-gray-600">{promo.description}</p>
                  <p className="text-sm line-through text-gray-500">
                    ${promo.originalPrice}
                  </p>
                </div>
              </div>
              <span className="font-bold text-primary">${promo.price}</span>
            </div>
            <div className="mt-2 flex justify-between">
              <button
                onClick={() => handleAddToCart(promo)}
                className="text-sm text-primary hover:underline"
              >
                Agregar al pedido
              </button>
              <button
                onClick={handleCartRedirect}
                className="text-sm text-primary hover:underline"
              >
                Ir al carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Renderizado del componente principal
  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Botón del chatbot cuando está cerrado */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary text-white rounded-full p-4 shadow-lg hover:bg-red-700 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}

      {/* Ventana del chat cuando está abierto */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl w-96 h-[600px] flex flex-col">
          {/* Header del chat */}
          <div className="bg-primary text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="text-lg font-semibold">Sushi Shop Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-red-700 rounded-full p-1 transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Área de mensajes */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p>{message.text}</p>
                  {message.showMenu && renderMenu()}
                </div>
              </div>
            ))}
            {/* Indicador de escritura */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Área de input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Escribe un mensaje..."
                className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                onClick={() => handleSendMessage()}
                className="bg-primary text-white p-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                <PaperAirplaneIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;