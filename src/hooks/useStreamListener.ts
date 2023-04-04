import { isNull } from "lodash"
import { useEffect } from "react"
import { ChatContextType, Message } from "../components/Chat/ChatContext"
import { ENV, MESSAGE_PASSING_CONVERSATION_FAILED, MESSAGE_PASSING_STREAM_OPENAI_CHAT_PORT } from "../lib/consts"

export const useStreamListener = ({
  conversation,
  setConversation,
  setConversationId
}: ChatContextType) => {

  useEffect(() => {
    if (!setConversation || ENV !== 'production') {
      return
    }

    let chatMessageState: Message | null = null

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

        // Streaming complete
        if (msg.includes('[DONE]')) {
          if (chatMessageState) {
            setConversation([...conversation, {
              ...chatMessageState,
              isStreaming: false
            }])
          }
          return
        }

        // Parse data based on openai response stream
        let data: any = {}

        try {
          data = JSON.parse(msg.slice(6,))
        }
        catch (e) {
          // console.warn("DEBUG: Parse data failed", e)
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

          chatMessageState = {
            id,
            isChatGPT: role === "assistant",
            isStreaming: true,
            message: message.parts[0].trim()
          }

          setConversation([...conversation, chatMessageState])

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
  }, [conversation, setConversation, setConversationId])
}
