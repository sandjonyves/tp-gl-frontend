import axios from 'axios';

// Définir l'URL de l'API
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
console.log('API URL:', API_URL); // Debug log

// Créer l'instance Axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 secondes timeout
  withCredentials: true, // Activer l'envoi des cookies avec les requêtes
});

// Intercepteur pour les requêtes
api.interceptors.request.use(
  (config) => {
    console.log('Request:', config.method?.toUpperCase(), config.url); // Debug log
    // Pas besoin de gérer le token manuellement si vous utilisez des cookies httpOnly
    // Le cookie accessToken sera envoyé automatiquement grâce à withCredentials
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Intercepteur pour les réponses
api.interceptors.response.use(
  (response) => {
    console.log('Response:', response.status, response.config.url); // Debug log
    return response;
  },
  async (error) => {
    console.error('Response Error:', {
      status: error.response?.status,
      url: error.config?.url,
      message: error.message,
      data: error.response?.data,
    });

    // Gestion des erreurs de timeout
    if (error.code === 'ECONNABORTED') {
      return Promise.reject(new Error('Request timeout. Please try again.'));
    }

    // Gestion des erreurs réseau
    if (!error.response) {
      return Promise.reject(new Error('Network error. Please check your connection.'));
    }

    // Gestion des erreurs 401 (token expiré)
    if (error.response.status === 401) {
      console.log('Attempting to refresh token...'); // Debug log
      try {
        // Appel à l'endpoint /refresh pour obtenir un nouveau accessToken
        // Le refreshToken est envoyé automatiquement via le cookie httpOnly
        const response = await api.post('users/refresh');
        // Pas besoin de stocker un token dans localStorage si vous utilisez des cookies httpOnly
        // Le nouveau accessToken sera défini par le backend via Set-Cookie

        // Réessayer la requête originale
        return api(error.config);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        // Redirection côté client uniquement si dans un navigateur
        if (typeof window !== 'undefined') {
          window.location.href = 'users/signin';
        }
        return Promise.reject(new Error('Session expired. Please login again.'));
      }
    }

    // Gestion des autres erreurs
    const errorMessage = error.response.data?.message || error.message || 'An error occurred';
    return Promise.reject(new Error(errorMessage));
  }
);

export default api;