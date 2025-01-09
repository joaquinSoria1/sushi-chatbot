Sushi Shop Chatbot

Un chatbot interactivo para realizar pedidos de sushi, construido con React, Node.js y MongoDB.

## 🚀 Instalación

### Prerrequisitos
- Node.js (v14 o superior)
- MongoDB
- NPM o Yarn

### Pasos de instalación

1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/sushi-chatbot.git
cd sushi-chatbot

Instalar dependencias

bashCopy# Instalar dependencias del proyecto
npm run install-all

Configurar variables de entorno

bashCopy# Copiar el archivo de ejemplo
cp .env.example .env
# Editar .env con tus credenciales

Cargar datos iniciales

bashCopycd server
node seeds/productSeeds.js

Iniciar el proyecto

bashCopy# En la raíz del proyecto
npm run dev
🤖 Ejemplos de mensajes para el Chatbot
El chatbot puede entender y responder a:

"¿Están abiertos ahora?" - Informa sobre el horario de atención
"Quiero ver el menú" - Muestra los rolls y promociones disponibles
"Quiero hacer un pedido" - Inicia el proceso de pedido
"¿Cuánto cuesta el California Roll?" - Informa precios específicos
"¿Qué promociones tienen?" - Muestra las promociones actuales

🛠️ Endpoints API
Productos

GET /api/products - Obtener todos los productos
GET /api/products?category=roll - Obtener productos por categoría
GET /api/products/:id - Obtener producto específico

Órdenes

POST /api/orders - Crear nueva orden
GET /api/orders/:id - Obtener estado de una orden
PATCH /api/orders/:id/status - Actualizar estado de orden

📦 Base de Datos
Estructura de Datos
javascriptCopy// Productos
{
  name: String,
  description: String,
  price: Number,
  pieces: Number,
  image: String,
  category: String ('roll' | 'promotion')
}

// Órdenes
{
  items: Array,
  customerInfo: Object,
  total: Number,
  status: String,
  trackingNumber: String
}
Carga de Datos Iniciales
Los datos de ejemplo se encuentran en server/seeds/productSeeds.js. Para cargarlos:
bashCopycd server
node seeds/productSeeds.js
⚡ Manejo de Errores
El sistema maneja los siguientes casos:

Validación de datos de entrada
Errores de conexión a la base de datos
Errores en la API de OpenAI
Productos no encontrados
Validación de información del cliente

🛡️ Variables de Entorno Necesarias
envCopyPORT=5000                    # Puerto del servidor
MONGO_URI=                   # URI de conexión a MongoDB
OPENAI_API_KEY=             # API Key de OpenAI
🔧 Tecnologías Utilizadas

Frontend: React, TailwindCSS
Backend: Node.js, Express
Base de datos: MongoDB
IA: OpenAI GPT-3.5
