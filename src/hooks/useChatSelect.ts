import { isNull } from "lodash";
import { useEffect } from "react";
import { ChatContextType, Message } from "../components/Chat/ChatContext";
import { ENV, MESSAGE_PASSING_OPENAI_CHAT_BY_ID_PORT } from "../lib/consts";

export const useChatSelect = (chatContext: ChatContextType) => {

  const traceMessages = (nodeId: string, mapping: any, messages: any[]) => {
    if (!nodeId || !mapping[nodeId]) return;

    const item = mapping[nodeId];
    if (item.message && item.message.author.role !== 'system') {
      messages.unshift({
        id: item.message.id,
        isError: false,
        isChatGPT: item.message.author.role === 'assistant',
        isStreaming: false,
        message: item.message.content.parts.join(''),
        parentId: item.parent
      });
    }

    traceMessages(item.parent, mapping, messages);
  }
  
  const chatSelectListener = (port: chrome.runtime.Port) => {
    if (port.name !== MESSAGE_PASSING_OPENAI_CHAT_BY_ID_PORT) {
      return
    }

    port.onMessage.addListener((msg) => {
      if (!msg || isNull(msg)) {
        return
      }

      if (chatContext.setTitle) {
        chatContext.setTitle(msg.title)
      }

      if (chatContext.setConversation) {
        const messages: Message[] = []
        traceMessages(msg.current_node, msg.mapping, messages);

        if(messages.length > 0) {
          chatContext.setConversation(messages)
        }
      }
    })
  }

  useEffect(() => {
    if (!chatContext || ENV !== 'production') {
      return
    }

    chrome.runtime.onConnect.addListener(chatSelectListener)

    return () => {
      chrome.runtime.onConnect.removeListener(chatSelectListener)
    }
  }, [chatContext])
}
