import base from "./baseService";

const instanceAuth = base.service(true);

export const getChat = (receiverId) => {
  return instanceAuth.get(`messages/chat/${receiverId}`);
};

export const sendMessage = (message) => {
  return instanceAuth.post(`messages/send-message`, message);
};

export default {
  getChat,
  sendMessage,
};
