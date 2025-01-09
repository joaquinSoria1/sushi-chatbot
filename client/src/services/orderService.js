import api from './api';

export const orderService = {
  create: async (orderData) => {
    try {
      // Asegurarnos de que los datos tengan el formato correcto
      const formattedOrder = {
        items: orderData.items.map(item => ({
          product: String(item.id),
          name: item.name,
          price: Number(item.price),
          quantity: Number(item.quantity || 1),
          description: item.description || ''
        })),
        customerInfo: {
          name: orderData.customerInfo.name,
          email: orderData.customerInfo.email,
          phone: orderData.customerInfo.phone,
          address: {
            street: orderData.customerInfo.address.street,
            number: orderData.customerInfo.address.number,
            apartment: orderData.customerInfo.address.apartment || '',
            notes: orderData.customerInfo.address.notes || ''
          }
        },
        total: Number(orderData.total),
        paymentMethod: orderData.paymentMethod
      };

      console.log('Enviando orden:', formattedOrder);
      const response = await api.post('/orders', formattedOrder);
      return response.data;
    } catch (error) {
      console.error('Error en la creación de la orden:', error.response?.data || error.message);
      throw error;
    }
  }
};