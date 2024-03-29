import api from ".";

export const createSafOrder = (data: any) => api.post(`/api/saf/order`, data);
export const createUser = (data: any) => api.post(`/api/saf`, data);
export const getSubById = (id: string) =>
  api.get(`/api/subscription/${id}`).then((res) => res.data);
