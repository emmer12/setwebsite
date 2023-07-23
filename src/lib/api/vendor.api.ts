import api from ".";

export const getVendors = () => api.get("/api/vendors").then((res) => res.data);
export const getBackdrop = (slug: string) =>
  api.get(`/api/vendors/${slug}`).then((res) => res.data);
export const getVendorCategories = (url: string) =>
  api.get(url).then((res) => res.data);
export const getFormData = (url: string) =>
  api.get(url).then((res) => res.data);

export const getVendorById = (id: string) =>
  api.get(`/api/vendors/${id}`).then((res) => res.data);

export const createVendorOrder = (data: any) =>
  api.post(`/api/vendors/order`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getLoggedInVendor = () =>
  api.get(`/api/vendors/current`).then((res) => res.data);
