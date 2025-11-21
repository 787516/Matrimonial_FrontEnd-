import { create } from "zustand";

const useConversation = create((set, get) => ({
  // ---------------------------
  // 🔵 SELECTED CONVERSATION
  // ---------------------------
  selectedConversation: null,
  setSelectedConversation: (conversation) =>
    set({
      selectedConversation: conversation,
      messages: [], // reset messages when switching chat
    }),

  // ---------------------------
  // 📌 LIST OF CONVERSATIONS
  // ---------------------------
  conversations: [],
  // can pass array OR updater function
  setConversations: (listOrUpdater) =>
    set((state) => ({
      conversations:
        typeof listOrUpdater === "function"
          ? listOrUpdater(state.conversations)
          : listOrUpdater,
    })),

  // ---------------------------
  // 💬 MESSAGES FOR ACTIVE CHAT
  // ---------------------------
  messages: [],
  // can pass array OR updater function
  setMessages: (listOrUpdater) =>
    set((state) => ({
      messages:
        typeof listOrUpdater === "function"
          ? listOrUpdater(state.messages)
          : listOrUpdater,
    })),

  // ---------------------------
  // 🔔 UNREAD BY USER (other user id)
  // unread = { [otherUserId]: count }
  // ---------------------------
  unread: {},

  addUnread: (userId) =>
    set((state) => ({
      unread: {
        ...state.unread,
        [userId]: (state.unread[userId] || 0) + 1,
      },
    })),

  clearUnread: (userId) =>
    set((state) => ({
      unread: {
        ...state.unread,
        [userId]: 0,
      },
    })),
}));

export default useConversation;
