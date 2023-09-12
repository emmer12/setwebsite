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

// *
export const createVendorOrder = (data: any) =>
  api.post(`/api/vendors/order`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const createVendor = (data: any) =>
  api.post(`/api/vendors/create`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });


export const updateVendor = (data: any, id: string) =>
  api.patch(`/api/vendors/${id}/update`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });


export const createRequest = (data: any) =>
  api.post(`/api/vendors/requests`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getLoggedInVendor = () =>
  api.get(`/api/vendors/current`).then((res) => res.data);

export const createQuote = (data: any) =>
  api.post(`/api/vendors/quotes`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getQuotes = () =>
  api.get("/api/vendors/quotes").then((res) => res.data);

export const getRequests = () =>
  api.get("/api/vendors/quotes/requests").then((res) => res.data);

export const getRequestQuote = (id: string) =>
  api.get(`/api/vendors/quotes/${id}`).then((res) => res.data);
