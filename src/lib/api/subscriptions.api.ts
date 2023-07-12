import api from ".";

export const getSubscriptions = () =>
  api.get(`/api/subscription`).then((res) => res.data);
