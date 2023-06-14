import { isNull } from "lodash"
import { useEffect } from "react"
import { ChatContextType, Message } from "../components/Chat/ChatContext"
import { ENV, MESSAGE_PASSING_CONVERSATION_FAILED, MESSAGE_PASSING_GET_OPENAI_CHAT_HISTORY, MESSAGE_PASSING_STREAM_OPENAI_CHAT_PORT } from "../lib/consts"

export const useStreamListener = ({
  conversation,
  setConversation,
  setConversationId
}: ChatContextType) => {

  useEffect(() => {
    const customEvent = new CustomEvent("conversationChanged", {
      detail: conversation,
    });
    window.dispatchEvent(customEvent);
  }, [JSON.stringify(conversation)]);

  useEffect(() => {
    if (!setConversation || ENV !== 'production') {
      return
    }

    const streamListener = (port: chrome.runtime.Port) => {
      if (port.name !== MESSAGE_PASSING_STREAM_OPENAI_CHAT_PORT) {
        return
      }

      port.onMessage.addListener((msg) => {
        // Fetch connection failed
        if (msg.code && msg.code === MESSAGE_PASSING_CONVERSATION_FAILED) {
          setConversation([...conversation, {
            isChatGPT: true,
            message: 'Connection Error!\n Please re-authenticate your account.',
            isError: true
          }])

          return
        }

        if (msg.includes('[DONE]')) {
          return
        }

        // Parse data based on openai response stream
        let data: any = {}

        try {
          data = JSON.parse(msg.slice(6,))
        }
        catch (e) {
          return
        }

        if (!isNull(data?.error)) {
          return
        }

        if (data?.message?.content?.parts) {
          const id = data.message.id;
          const role = data.message.author.role;
          const message = data.message.content;
          const conversationId = data.conversation_id

          const tempState = {
            id,
            isChatGPT: role === "assistant",
            isStreaming: true,
            message: message.parts[0].trim()
          }
          setConversation([...conversation, tempState])

          if (setConversationId) {
            setConversationId(conversationId)
          }
        }
      })
    }

    chrome.runtime.onConnect.addListener(streamListener)

    return () => {
      chrome.runtime.onConnect.removeListener(streamListener)
    }
  }, [JSON.stringify(conversation), setConversation, setConversationId])

  useEffect(() => {
    const streamCompleteListener = (port: chrome.runtime.Port) => {
      if (port.name !== MESSAGE_PASSING_STREAM_OPENAI_CHAT_PORT) {
        return
      }

      let streamedConversation: Message[] = []
      const onConversationChanged = (event: any) => {
        // Handle state change here
        streamedConversation = event.detail;
      };

      window.addEventListener("conversationChanged", onConversationChanged);

      const streamPortListener = (msg: any) => {
        // Streaming complete
        if (msg.includes('[DONE]')) {
          const newConversation = streamedConversation.slice(0, -1);
          let lastElementIndex = streamedConversation.length - 1;
          let updatedLastElement = {
            ...streamedConversation[lastElementIndex],
            isStreaming: false
          };
          newConversation.push(updatedLastElement);
    
          if (setConversation) {
            setConversation(newConversation)
    
            if (newConversation.length <= 2 && !updatedLastElement.isError) {
              chrome.runtime.sendMessage({ code: MESSAGE_PASSING_GET_OPENAI_CHAT_HISTORY })
            }
          }
        }
      }

      port.onMessage.addListener(streamPortListener)
    }

    chrome.runtime.onConnect.addListener(streamCompleteListener)

    return () => {
      chrome.runtime.onConnect.removeListener(streamCompleteListener)
    }

  }, [JSON.stringify(conversation), setConversation])
}
