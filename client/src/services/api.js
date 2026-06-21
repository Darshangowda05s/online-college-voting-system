import axios from "axios";



const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,  
});
export const electionAPI = {
  getAll: () => api.get("/elections"),

  getOne: (id) =>
    api.get(`/elections/${id}`),

  vote: (id, candidateId) =>
    api.post(`/elections/${id}/vote`, {
      candidateId,
    }),

  results: (id) =>
    api.get(`/elections/${id}/results`),
};

export const userAPI = {
  getProfile: () =>
    api.get("/users/me"),
};

export default api;