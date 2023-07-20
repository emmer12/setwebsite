import api from ".";

export const getAllUsers = () =>
  api.get("/api/users/admin").then((res) => res.data);

export const deleteUser = (id: string) =>
  api.delete(`/api/users/admin/${id}`).then((res) => res.data);
