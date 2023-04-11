import { isNull } from "lodash"
import { useEffect } from "react"
import { ENV, MESSAGE_PASSING_GET_OPENAI_CHAT_HISTORY, MESSAGE_PASSING_OPENAI_CHAT_HISTORY_PORT } from "../lib/consts"
import { ChatHistory } from "../types/openai"

export const useChatHistory = (setChatHistory: (chatHistory: ChatHistory[]) => void) => {

  const chatHistoryListener = (port: chrome.runtime.Port) => {
    if (port.name !== MESSAGE_PASSING_OPENAI_CHAT_HISTORY_PORT) {
      return
    }

    port.onMessage.addListener((msg) => {
      if (msg && !isNull(msg)) {
        setChatHistory(msg as ChatHistory[])
      }
    })
  }

  useEffect(() => {
    if (!setChatHistory || ENV !== 'production') {
      return
    }

    chrome.runtime.onConnect.addListener(chatHistoryListener)
    chrome.runtime.sendMessage({ code: MESSAGE_PASSING_GET_OPENAI_CHAT_HISTORY })
    
    return () => {
      chrome.runtime.onConnect.removeListener(chatHistoryListener)
    }
  }, [setChatHistory])
}
