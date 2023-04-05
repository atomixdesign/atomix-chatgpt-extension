import React from "react";

export type Message = {
  id?: string;
  isError?: boolean;
  isChatGPT?: boolean;
  isStreaming?: boolean;
  message: any;
}

export type ChatContextType = {
  username?: string
  title?: string
  conversation: Message[]
  conversationId?: string
  setConversationId?: (conversationId: string) => void
  setTitle?: (title: string) => void
  setUsername?: (username: string) => void
  setConversation?: (conversation: Message[]) => void
}

export const ChatContext = React.createContext<ChatContextType>({
  username: "TT",
  title: "New chat",
  conversation: [],
  setUsername: (username: string) => {},
  setTitle: (title: string) => {},
  setConversation: (conversation: Message[]) => {},
})

export const upsertOne = (array: Message[], item: Message) => {
  return [...array, item]
}