import api from './api';

export const vendorService = {
  getAll: async () => {
    const response = await api.get('/vendors');
    return response;
  },

  getById: async (id) => {
    const response = await api.get(`/vendors/${id}`);
    return response;
  },

  create: async (data) => {
    const response = await api.post('/vendors', data);
    return response;
  },

  update: async (id, data) => {
    const response = await api.put(`/vendors/${id}`, data);
    return response;
  },

  delete: async (id) => {
    await api.delete(`/vendors/${id}`);
  },
};
