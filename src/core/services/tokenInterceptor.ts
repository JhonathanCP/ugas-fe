import axios from 'axios';

// Crear una instancia de axios
const api = axios.create({
  baseURL: 'http://localhost:8080', // Reemplaza con tu URL base
});

// Agregar un interceptor de solicitud
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token'); // Obtener el token desde el local storage

    // Excluir la ruta de login
    if (config.url && !config.url.includes('/login')) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;