import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  items: [{
    product: {
      type: String,  // Cambiado a String ya que enviamos el ID directamente
      required: [true, 'El ID del producto es requerido']
    },
    name: {
      type: String,
      required: [true, 'El nombre del producto es requerido']
    },
    price: {
      type: Number,
      required: [true, 'El precio es requerido']
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'La cantidad debe ser al menos 1']
    },
    description: String
  }],
  customerInfo: {
    name: {
      type: String,
      required: [true, 'El nombre es requerido']
    },
    email: {
      type: String,
      required: [true, 'El email es requerido']
    },
    phone: {
      type: String,
      required: [true, 'El teléfono es requerido']
    },
    address: {
      street: {
        type: String,
        required: [true, 'La calle es requerida']
      },
      number: {
        type: String,
        required: [true, 'El número es requerido']
      },
      apartment: String,
      notes: String
    }
  },
  total: {
    type: Number,
    required: [true, 'El total es requerido']
  },
  paymentMethod: {
    type: String,
    enum: ['efectivo', 'debito', 'credito'],
    required: [true, 'El método de pago es requerido']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'ready', 'delivered'],
    default: 'pending'
  },
  trackingNumber: {
    type: String,
    default: function() {
      return `SS${Date.now()}${Math.floor(Math.random() * 1000)}`;
    }
  }
}, {
  timestamps: true
});

export default mongoose.model('Order', orderSchema);