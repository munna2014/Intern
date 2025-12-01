import api from './api';

export const staffService = {
  getAll: async () => {
    const response = await api.get('/staff');
    return response;
  },

  getById: async (id) => {
    const response = await api.get(`/staff/${id}`);
    return response;
  },

  create: async (data) => {
    const response = await api.post('/staff', data);
    return response;
  },

  update: async (id, data) => {
    const response = await api.put(`/staff/${id}`, data);
    return response;
  },

  delete: async (id) => {
    await api.delete(`/staff/${id}`);
  },
};
