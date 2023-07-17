import api from ".";

export const getBackdrops = () =>
  api.get("/api/backdrops").then((res) => res.data);
export const getBackdrop = (slug: string) =>
  api.get(`/api/backdrops/${slug}`).then((res) => res.data);
export const getBackdropCategories = () => api.get(`/api/backdrops/categories`);

export const createBackdropOrder = (data: any) =>
  api.post(`/api/backdrops/order`, data);

export const createBackdrop = (data: any) =>
  api.post(`/api/backdrops/admin`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getAllBackdrops = () =>
  api.get("/api/backdrops/admin").then((res) => res.data);
