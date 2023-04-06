import { useEffect } from "react"
import { ENV, MESSAGE_PASSING_TOGGLE_SIDEBAR } from "../lib/consts"

export const useSidebarOpen = (open: boolean, setOpen: (open: boolean) => void) => {
  useEffect(() => {
    if (ENV !== 'production') {
      return
    }
    const onSidebarToggleListener = (request: any, sender: any, sendResponse: any) => {
      if (request.code !== MESSAGE_PASSING_TOGGLE_SIDEBAR) {
        return
      }

      setOpen(!open)
      sendResponse({ success: true })
    }
    
    chrome.runtime.onMessage.addListener(onSidebarToggleListener)

    return () => {
      chrome.runtime.onMessage.removeListener(onSidebarToggleListener)
    }
  }, [open, setOpen])
}
