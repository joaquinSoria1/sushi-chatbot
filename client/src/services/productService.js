import api from './api';

// Servicio para manejar todas las operaciones relacionadas con productos
export const productService = {
  // Obtener todos los productos
  getAll: async () => {
    try {
      const response = await api.get('/products');
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Obtener productos por categoría (sushi o promociones)
  getByCategory: async (category) => {
    try {
      const response = await api.get(`/products?category=${category}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${category}:`, error);
      throw error;
    }
  },

  // Obtener un producto específico
  getById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }
};