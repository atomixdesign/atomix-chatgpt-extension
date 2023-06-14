
import { useEffect } from "react";
import { ChatContextType } from "../components/Chat/ChatContext";
import { ENV, MESSAGE_PASSING_GET_OPENAI_CHAT_NAME, MESSAGE_PASSING_STEAM_OPENAI_CHAT_NAME_PORT } from "../lib/consts";
import { isNull } from "../lib/isNull";
import { ChatHistory } from "../types/openai";

export const useChatName = (chatContext: ChatContextType, chatHistory: ChatHistory[], setChatHistory: (chatHistory: ChatHistory[]) => void) => {

  // Get name of the conversation
  useEffect(() => {
    if (chatContext && chatContext.conversationId && chatContext.conversation && chatContext.conversation.length === 2) {
      const lastMessage = chatContext.conversation[chatContext.conversation.length - 1]
      if (lastMessage && lastMessage.isChatGPT && !lastMessage.isStreaming && !lastMessage.isError && chatContext.title === 'New chat') {
        chrome.runtime.sendMessage({
          code: MESSAGE_PASSING_GET_OPENAI_CHAT_NAME,
          conversationId: chatContext.conversationId,
          messageId: lastMessage.id
        })
      }
    }
  }, [chatContext.conversation])


  const chatNameListener = (port: chrome.runtime.Port) => {
    if (port.name !== MESSAGE_PASSING_STEAM_OPENAI_CHAT_NAME_PORT) {
      return
    }

    port.onMessage.addListener((msg) => {
      if (isNull(msg)) {
        return
      }

      if (chatContext.setTitle && msg.title) {
        chatContext.setTitle(msg.title)
        
        const newChatHistory = chatHistory.map((chat) => {
          if (chat.id === chatContext.conversationId) {
            chat.title = msg.title
            return {
              ...chat,
              title: msg.title
            }
          }
          return chat
        })
        setChatHistory(newChatHistory)
      }
    })
  }

  useEffect(() => {
    if (!chatContext || ENV !== 'production') {
      return
    }

    chrome.runtime.onConnect.addListener(chatNameListener)

    return () => {
      chrome.runtime.onConnect.removeListener(chatNameListener)
    }
  }, [chatContext, setChatHistory, chatHistory])
}
