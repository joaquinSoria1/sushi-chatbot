import Order from '../models/Order.js';

// Controlador para crear nuevos pedidos
export const createOrder = async (req, res) => {
  try {
    console.log('Datos recibidos:', req.body); // Para debugging

    const { items, customerInfo, total, paymentMethod } = req.body;

    // Validaciones básicas
    if (!items || !items.length) {
      return res.status(400).json({
        success: false,
        message: 'El pedido debe contener al menos un producto'
      });
    }

    // Crear la orden
    const order = new Order({
      items,
      customerInfo,
      total,
      paymentMethod
    });

    // Guardar la orden
    const savedOrder = await order.save();

    res.status(201).json({
      success: true,
      message: 'Pedido creado exitosamente',
      order: savedOrder
    });

  } catch (error) {
    console.error('Error al crear orden:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Error de validación',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error al crear el pedido',
      error: error.message
    });
  }
};

// Controlador para obtener un pedido específico
export const getOrder = async (req, res) => {
  try {
    // Buscamos por ID o número de seguimiento
    const order = await Order.findOne({
      $or: [
        { _id: req.params.id },
        { trackingNumber: req.params.id }
      ]
    }).populate('items.product');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Pedido no encontrado'
      });
    }

    res.json({
      success: true,
      order
    });
  } catch (error) {
    console.error('Error al obtener el pedido:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener el pedido',
      error: error.message
    });
  }
};

// Controlador para obtener todos los pedidos
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 }) // Ordenamos por fecha, más recientes primero
      .populate('items.product');

    res.json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    console.error('Error al obtener los pedidos:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener los pedidos',
      error: error.message
    });
  }
};

// Controlador para actualizar el estado de un pedido
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    // Validamos que el estado sea válido
    const validStatuses = ['pending', 'confirmed', 'preparing', 'ready', 'delivered'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Estado no válido'
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Pedido no encontrado'
      });
    }

    // Actualizamos el estado
    order.status = status;
    await order.save();

    res.json({
      success: true,
      message: 'Estado del pedido actualizado exitosamente',
      order
    });
  } catch (error) {
    console.error('Error al actualizar el estado del pedido:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar el estado del pedido',
      error: error.message
    });
  }
};

// Controlador para buscar pedidos por número de seguimiento
export const getOrderByTracking = async (req, res) => {
  try {
    const { trackingNumber } = req.params;
    
    const order = await Order.findOne({ trackingNumber })
      .populate('items.product');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Pedido no encontrado'
      });
    }

    res.json({
      success: true,
      order
    });
  } catch (error) {
    console.error('Error al buscar el pedido:', error);
    res.status(500).json({
      success: false,
      message: 'Error al buscar el pedido',
      error: error.message
    });
  }
};