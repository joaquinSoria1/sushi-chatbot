import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const API_URL = 'https://api.openai.com/v1/chat/completions';

// Contexto del restaurante para la IA
const SYSTEM_CONTEXT = `
  Eres un asistente virtual para un restaurante de sushi llamado Sushi Shop.
  Horario: 11:00 a 23:00, todos los días.
  
  Menú:
  - California Roll: Palta, pepino, kanikama (8 piezas) - $1200
  - Sake Roll: Salmón, palta, queso philadelphia (8 piezas) - $1500
  - Ebi Roll: Langostinos, palta, verdeo (8 piezas) - $1400
  - Dragon Roll: Langostinos rebozados, palta por fuera (8 piezas) - $1600

  Promociones:
  - Combo Familiar: 30 piezas variadas + 2 bebidas - $4500
  - Combo Amigos: 24 piezas + 1 bebida - $3800

  Instrucciones especiales:
  - Si el usuario pregunta por el menú, responde con [MOSTRAR_MENU] seguido de tu respuesta
  - Si el usuario quiere hacer un pedido, guíalo y usa [AGREGAR_AL_CARRITO:nombre_del_roll]
  - Mantén respuestas amables y concisas
  - Ayuda a los clientes a elegir según sus preferencias
`;

export const aiService = {
  async getChatResponse(userMessage) {
    try {
      const response = await axios.post(API_URL, {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: SYSTEM_CONTEXT
          },
          {
            role: "user",
            content: userMessage
          }
        ],
        temperature: 0.7,
        max_tokens: 150,
        store: true
      }, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Error al comunicarse con OpenAI:', error);
      
      // Manejamos diferentes tipos de errores
      if (error.response?.status === 401) {
        throw new Error('Error de autenticación con OpenAI. Verifica tu API key.');
      } else if (error.response?.status === 429) {
        throw new Error('Has excedido el límite de solicitudes a OpenAI.');
      } else {
        throw new Error('Error al procesar tu mensaje. Por favor, intenta de nuevo.');
      }
    }
  }
};