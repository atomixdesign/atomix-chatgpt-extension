import { useEffect } from "react"
import { ENV, MESSAGE_PASSING_TOGGLE_SIDEBAR } from "../lib/consts"

export const useSidebarOpen = (open: boolean, setOpen: (open: boolean) => void) => {
  useEffect(() => {
    if (ENV !== 'production') {
      return
    }
    
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.code !== MESSAGE_PASSING_TOGGLE_SIDEBAR) {
        return
      }

      setOpen(!open)
      sendResponse({ success: true })
    })
  }, [])
}