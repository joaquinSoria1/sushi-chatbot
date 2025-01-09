import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptores para manejo de errores
api.interceptors.response.use(
  response => response,
  error => {
    console.error('Error en la petición:', error);
    if (error.response) {
      console.error('Respuesta del servidor:', error.response.data);
    }
    return Promise.reject(error);
  }
);

export default api;