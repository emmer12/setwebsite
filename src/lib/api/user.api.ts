import api from ".";

const END_POINT = "/api/users";

export const getAllUsers = () =>
  api.get(`${END_POINT}/admin`).then((res) => res.data);

export const deleteUser = (id: string) =>
  api.delete(`${END_POINT}/admin/${id}`).then((res) => res.data);

export const getRequests = (data: any) =>
  api.get(`${END_POINT}/requests`).then((res) => res.data);

export const createRequest = (data: any) =>
  api.post(`${END_POINT}/requests`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getNotifications = (data: any) =>
  api.get(`${END_POINT}/notifications`).then((res) => res.data);

export const makeNotifications = () =>
  api.patch(`${END_POINT}/notifications`).then((res) => res.data);

export const forgotPassword = (data: { email: string }) =>
  api.post(`${END_POINT}/forgot-password`, data).then((res) => res.data);

export const validateToken = (data: any) =>
  api
    .post(`${END_POINT}/validate-token`, { token: data })
    .then((res) => res.data);

export const resetPassword = (data: {
  id: string;
  password: string;
  password_confirmation: string;
  token: string;
}) => api.post(`${END_POINT}/reset-password`, data).then((res) => res.data);

export const topUp = (data: { amount: number }) =>
  api.post(`${END_POINT}/top-up`, data).then((res) => res.data);

