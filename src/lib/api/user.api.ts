import api from ".";

export const getAllUsers = () =>
  api.get("/api/users/admin").then((res) => res.data);

export const deleteUser = (id: string) =>
  api.delete(`/api/users/admin/${id}`).then((res) => res.data);

export const getRequests = (data: any) =>
  api.get(`/api/users/requests`).then((res) => res.data);

export const createRequest = (data: any) =>
  api.post(`/api/users/requests`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
