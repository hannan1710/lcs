// API Service Layer for La Coiffure Salon
const API_BASE_URL = 'http://localhost:3001/api';

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.message || `HTTP error! status: ${response.status}`);
      error.response = { data, status: response.status };
      throw error;
    }

    return data;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// Authentication API
export const authAPI = {
  login: async (credentials) => {
    return apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  register: async (userData) => {
    return apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  adminLogin: async (credentials) => {
    return apiCall('/auth/admin-login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  logout: async () => {
    return apiCall('/auth/logout', {
      method: 'POST',
    });
  },
};

// Admin Management API
export const adminAPI = {
  getUsers: async () => {
    return apiCall('/admin/users');
  },

  createUser: async (userData) => {
    return apiCall('/admin/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  updateUser: async (id, userData) => {
    return apiCall(`/admin/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },

  updatePassword: async (id, passwordData) => {
    return apiCall(`/admin/users/${id}/password`, {
      method: 'PUT',
      body: JSON.stringify(passwordData),
    });
  },

  deleteUser: async (id) => {
    return apiCall(`/admin/users/${id}`, {
      method: 'DELETE',
    });
  },
};

// Appointments API
export const appointmentsAPI = {
  getAll: async (branch = null) => {
    const url = branch ? `/appointments?branch=${branch}` : '/appointments';
    return apiCall(url);
  },

  getById: async (id) => {
    return apiCall(`/appointments/${id}`);
  },

  create: async (appointmentData) => {
    return apiCall('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointmentData),
    });
  },

  update: async (id, appointmentData) => {
    return apiCall(`/appointments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(appointmentData),
    });
  },

  delete: async (id) => {
    return apiCall(`/appointments/${id}`, {
      method: 'DELETE',
    });
  },

  updateStatus: async (id, status) => {
    return apiCall(`/appointments/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },
};

// Services API
export const servicesAPI = {
  getAll: async () => {
    return apiCall('/services');
  },

  getById: async (id) => {
    return apiCall(`/services/${id}`);
  },

  create: async (serviceData) => {
    return apiCall('/services', {
      method: 'POST',
      body: JSON.stringify(serviceData),
    });
  },

  update: async (id, serviceData) => {
    return apiCall(`/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(serviceData),
    });
  },

  delete: async (id) => {
    return apiCall(`/services/${id}`, {
      method: 'DELETE',
    });
  },
};

// Stylists API
export const stylistsAPI = {
  getAll: async (branch = null) => {
    const url = branch ? `/stylists?branch=${branch}` : '/stylists';
    return apiCall(url);
  },

  getById: async (id) => {
    return apiCall(`/stylists/${id}`);
  },

  create: async (stylistData) => {
    return apiCall('/stylists', {
      method: 'POST',
      body: JSON.stringify(stylistData),
    });
  },

  update: async (id, stylistData) => {
    return apiCall(`/stylists/${id}`, {
      method: 'PUT',
      body: JSON.stringify(stylistData),
    });
  },

  delete: async (id) => {
    return apiCall(`/stylists/${id}`, {
      method: 'DELETE',
    });
  },
};

// Clients API
export const clientsAPI = {
  getAll: async () => {
    return apiCall('/clients');
  },

  getById: async (id) => {
    return apiCall(`/clients/${id}`);
  },

  create: async (clientData) => {
    return apiCall('/clients', {
      method: 'POST',
      body: JSON.stringify(clientData),
    });
  },

  update: async (id, clientData) => {
    return apiCall(`/clients/${id}`, {
      method: 'PUT',
      body: JSON.stringify(clientData),
    });
  },

  delete: async (id) => {
    return apiCall(`/clients/${id}`, {
      method: 'DELETE',
    });
  },
};

// Analytics API
export const analyticsAPI = {
  getDashboardStats: async (branch = null) => {
    const url = branch ? `/analytics/dashboard?branch=${branch}` : '/analytics/dashboard';
    return apiCall(url);
  },

  getRevenueStats: async (period = 'month') => {
    return apiCall(`/analytics/revenue?period=${period}`);
  },

  getPopularServices: async () => {
    return apiCall('/analytics/popular-services');
  },
};

// Settings API
export const settingsAPI = {
  get: async () => {
    return apiCall('/settings');
  },

  update: async (settingsData) => {
    return apiCall('/settings', {
      method: 'PUT',
      body: JSON.stringify(settingsData),
    });
  },
};

// Products API
export const productsAPI = {
  getAll: async () => {
    return apiCall('/products');
  },

  getById: async (id) => {
    return apiCall(`/products/${id}`);
  },

  create: async (productData) => {
    return apiCall('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  },

  update: async (id, productData) => {
    return apiCall(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  },

  delete: async (id) => {
    return apiCall(`/products/${id}`, {
      method: 'DELETE',
    });
  },
};

// Payment API
export const paymentAPI = {
  processPayment: async (paymentData) => {
    return apiCall('/payments/process', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  },

  getPaymentHistory: async (params = {}) => {
    const queryParams = new URLSearchParams();
    if (params.clientId) queryParams.append('clientId', params.clientId);
    if (params.limit) queryParams.append('limit', params.limit);
    if (params.offset) queryParams.append('offset', params.offset);
    
    const queryString = queryParams.toString();
    const endpoint = queryString ? `/payments/history?${queryString}` : '/payments/history';
    return apiCall(endpoint);
  },

  getPaymentById: async (id) => {
    return apiCall(`/payments/${id}`);
  },

  processRefund: async (refundData) => {
    return apiCall('/payments/refund', {
      method: 'POST',
      body: JSON.stringify(refundData),
    });
  },

  validateGiftCard: async (code) => {
    return apiCall('/payments/validate-gift-card', {
      method: 'POST',
      body: JSON.stringify({ code }),
    });
  },

  getPaymentAnalytics: async (params = {}) => {
    const queryParams = new URLSearchParams();
    if (params.startDate) queryParams.append('startDate', params.startDate);
    if (params.endDate) queryParams.append('endDate', params.endDate);
    
    const queryString = queryParams.toString();
    const endpoint = queryString ? `/payments/analytics?${queryString}` : '/payments/analytics';
    return apiCall(endpoint);
  },
};

export default {
  auth: authAPI,
  admin: adminAPI,
  appointments: appointmentsAPI,
  services: servicesAPI,
  stylists: stylistsAPI,
  clients: clientsAPI,
  analytics: analyticsAPI,
  settings: settingsAPI,
  products: productsAPI,
  payment: paymentAPI,
};

