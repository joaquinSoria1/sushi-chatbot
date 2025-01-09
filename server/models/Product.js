const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'La descripción es requerida']
  },
  price: {
    type: Number,
    required: [true, 'El precio es requerido'],
    min: 0
  },
  pieces: {
    type: Number,
    required: [true, 'La cantidad de piezas es requerida'],
    min: 1
  },
  image: {
    type: String,
    required: [true, 'La imagen es requerida']
  },
  category: {
    type: String,
    enum: ['roll', 'promotion'],
    required: true
  },
  originalPrice: {
    type: Number,
    // Solo requerido para promociones
    default: null
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);