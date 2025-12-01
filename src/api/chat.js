import axiosInstance from './axiosInstance';

export const getConversations = () => {
  return axiosInstance.get('/chat/conversations');
};

export const getConversationById = (conversationId) => {
  return axiosInstance.get(`/chat/conversations/${conversationId}`);
};

export const sendMessage = (conversationId, message) => {
  return axiosInstance.post(`/chat/conversations/${conversationId}/messages`, { message });
};

export const getMessages = (conversationId, page = 1) => {
  return axiosInstance.get(`/chat/conversations/${conversationId}/messages`, { params: { page } });
};


export const startConversation = (userId) => {
  return axiosInstance.post('/chat/conversations', { userId });
};

export const deleteMessage = (conversationId) => {
  return axiosInstance.delete(`/chat/conversations/${conversationId}`);
};

export const deleteConversation = (conversationId) => {
  return axiosInstance.delete(`/chat/conversations/${conversationId}`);
};
