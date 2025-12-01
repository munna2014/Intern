import api from './api';

export const assignmentService = {
  getAll: async (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    const response = await api.get(`/assignments?${params}`);
    return response;
  },

  getById: async (id) => {
    const response = await api.get(`/assignments/${id}`);
    return response;
  },

  generateSchedule: async () => {
    const response = await api.post('/assignments/generate');
    return response;
  },

  update: async (id, data) => {
    const response = await api.put(`/assignments/${id}`, data);
    return response;
  },

  delete: async (id) => {
    await api.delete(`/assignments/${id}`);
  },

  checkIn: async (id, location = null) => {
    const response = await api.post(`/assignments/${id}/check-in`, { location });
    return response;
  },

  checkOut: async (id, location = null) => {
    const response = await api.post(`/assignments/${id}/check-out`, { location });
    return response;
  },
};
