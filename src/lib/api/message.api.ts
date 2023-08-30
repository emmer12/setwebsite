import api from ".";

const END_POINT = "/api/chats";

export const getChats = () =>
  api.get(`${END_POINT}`).then((res) => res.data);

export const createMsg = (data: any) =>
  api.post(`${END_POINT}/messages`, data).then((res) => res.data);

export const getMessages = (chatId: string) =>
  api.get(`${END_POINT}/messages`).then((res) => res.data);