import { createContext, useState, useCallback } from 'react';
import React from 'react'

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const addConversation = useCallback((conversation) => {
    setConversations((prev) => [...prev, conversation]);
  }, []);

  const addMessage = useCallback((message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const value = {
    conversations,
    currentConversation,
    messages,
    loading,
    addConversation,
    setCurrentConversation,
    addMessage,
    clearMessages,
    setLoading,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatContext;
