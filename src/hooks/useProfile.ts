import { useEffect } from "react"
import { ChatContextType } from "../components/Chat/ChatContext"
import { ENV, MESSAGE_PASSING_GET_OPENAI_PROFILE, MESSAGE_PASSING_PROFILE_PORT } from "../lib/consts"
import { isNull } from "../lib/isNull"

export const useProfile = ({
  setUsername
}: ChatContextType) => {

  const profileListener = (port: chrome.runtime.Port) => {
    if (port.name !== MESSAGE_PASSING_PROFILE_PORT) {
      return
    }

    port.onMessage.addListener((msg) => {
      if (setUsername && msg && !isNull(msg)) {
        setUsername(msg.name || 'A')
      }
    })
  }

  useEffect(() => {
    if (!setUsername || ENV !== 'production') {
      return
    }

    chrome.runtime.onConnect.addListener(profileListener)
    chrome.runtime.sendMessage({ code: MESSAGE_PASSING_GET_OPENAI_PROFILE })

    return () => {
      chrome.runtime.onConnect.removeListener(profileListener)
    }
  }, [setUsername])
}
