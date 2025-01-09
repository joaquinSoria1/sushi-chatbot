import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configurar dotenv
dotenv.config({ path: path.join(__dirname, '../.env') });

// Definir el esquema del producto
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  pieces: Number,
  image: String,
  category: String,
  originalPrice: Number
});

const Product = mongoose.model('Product', productSchema);

const products = [
  {
    name: "California Roll",
    description: "Palta, pepino, kanikama",
    price: 1200,
    pieces: 8,
    image: "https://images.unsplash.com/photo-1617196034280-45e7be97f013?w=800",
    category: "roll"
  },
  {
    name: "Sake Roll",
    description: "Salmón, palta, queso philadelphia",
    price: 1500,
    pieces: 8,
    image: "https://images.unsplash.com/photo-1617196035303-964a45bbc9f0?w=800",
    category: "roll"
  },
  {
    name: "Ebi Roll",
    description: "Langostinos, palta, verdeo",
    price: 1400,
    pieces: 8,
    image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=800",
    category: "roll"
  },
  {
    name: "Dragon Roll",
    description: "Langostinos rebozados, palta por fuera",
    price: 1600,
    pieces: 8,
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800",
    category: "roll"
  },
  {
    name: "Rainbow Roll",
    description: "Roll cubierto con finas láminas de pescados variados",
    price: 1700,
    pieces: 8,
    image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=800",
    category: "roll"
  },
  {
    name: "Veggie Roll",
    description: "Palta, pepino, zanahoria y verduras de estación",
    price: 1100,
    pieces: 8,
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800",
    category: "roll"
  },
  {
    name: "Tempura Roll",
    description: "Roll rebozado y frito con salmón y queso",
    price: 1550,
    pieces: 8,
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800",
    category: "roll"
  },
  {
    name: "Spicy Tuna Roll",
    description: "Atún picante, verdeo y pepino",
    price: 1450,
    pieces: 8,
    image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=800",
    category: "roll"
  }
];

const promotions = [
  {
    name: "Combo Familiar",
    description: "30 piezas variadas + 2 bebidas",
    price: 4500,
    originalPrice: 5500,
    image: "https://images.unsplash.com/photo-1676037150108-0fa45654cd70?w=800",
    category: "promotion"
  },
  {
    name: "Combo Amigos",
    description: "24 piezas + 1 bebida",
    price: 3800,
    originalPrice: 4500,
    image: "https://images.unsplash.com/photo-1674147905121-5694d864339f?w=800",
    category: "promotion"
  }
];

// Función para conectar a MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/sushi-shop');
    console.log('MongoDB conectado');
  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
    process.exit(1);
  }
};

// Función para poblar la base de datos
const seedDB = async () => {
  try {
    await connectDB();
    
    // Limpiar la base de datos existente
    await Product.deleteMany({});
    console.log('Base de datos limpiada');

    // Insertar los nuevos productos
    await Product.insertMany([...products, ...promotions]);
    console.log('Productos insertados exitosamente');

    // Cerrar la conexión
    await mongoose.connection.close();
    console.log('Conexión cerrada');
    process.exit(0);
  } catch (error) {
    console.error('Error al poblar la base de datos:', error);
    process.exit(1);
  }
};

// Ejecutar el seed
seedDB();