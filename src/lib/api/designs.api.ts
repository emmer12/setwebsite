import api from ".";

export const getBackdrops = () => api.get("/api/designs");
export const getBackdrop = (slug: string) => api.get(`/api/designs/${slug}`);
export const getBackdropCategories = () => api.get(`/api/designs/categories`);
