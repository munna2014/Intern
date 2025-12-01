const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// API request helper
const apiRequest = async (endpoint, options = {}) => {
  const token = getAuthToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
};

// Vendors API
export const vendorsAPI = {
  getAll: () => apiRequest('/vendors'),
  getOne: (id) => apiRequest(`/vendors/${id}`),
  create: (data) => apiRequest('/vendors', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiRequest(`/vendors/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiRequest(`/vendors/${id}`, {
    method: 'DELETE',
  }),
};

// Staff API
export const staffAPI = {
  getAll: () => apiRequest('/staff'),
  getOne: (id) => apiRequest(`/staff/${id}`),
  create: (data) => apiRequest('/staff', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiRequest(`/staff/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiRequest(`/staff/${id}`, {
    method: 'DELETE',
  }),
};

// Assignments API
export const assignmentsAPI = {
  getAll: () => apiRequest('/assignments'),
  getOne: (id) => apiRequest(`/assignments/${id}`),
  create: (data) => apiRequest('/assignments', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiRequest(`/assignments/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiRequest(`/assignments/${id}`, {
    method: 'DELETE',
  }),
  checkIn: (id) => apiRequest(`/assignments/check-in?id=${id}`, {
    method: 'POST',
  }),
  checkOut: (id) => apiRequest(`/assignments/check-out?id=${id}`, {
    method: 'POST',
  }),
  generate: () => apiRequest('/assignments/generate', {
    method: 'POST',
  }),
};

// Staff Applications API
export const staffApplicationsAPI = {
  getAll: (status) => apiRequest(`/staff-applications${status ? `?status=${status}` : ''}`),
  getOne: (id) => apiRequest(`/staff-applications/${id}`),
  create: (data) => apiRequest('/staff-applications', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  approve: (id, adminNotes) => apiRequest(`/staff-applications/${id}/approve`, {
    method: 'POST',
    body: JSON.stringify({ admin_notes: adminNotes }),
  }),
  reject: (id, adminNotes) => apiRequest(`/staff-applications/${id}/reject`, {
    method: 'POST',
    body: JSON.stringify({ admin_notes: adminNotes }),
  }),
};

// Auth API
export const authAPI = {
  login: (username, password) => fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  }).then(res => res.json()),
  
  register: (username, email, password, role = 'staff') => fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password, role }),
  }).then(res => res.json()),
  
  logout: () => {
    localStorage.removeItem('token');
  },
};

// Default export for backward compatibility with existing service files
const api = {
  get: (endpoint) => apiRequest(endpoint),
  post: (endpoint, data) => apiRequest(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  put: (endpoint, data) => apiRequest(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (endpoint) => apiRequest(endpoint, {
    method: 'DELETE',
  }),
};

export default api;
