import { isNull } from "lodash"
import { CHROME_STORAGE_OPENAI_CF_CLEARANCE_KEY, CHROME_STORAGE_OPENAI_SESSION_KEY, CHROME_STORAGE_OPENAI_USERAGENT_KEY, ENV } from "../../lib/consts"

export const setOpenAIHeaderChromeStorage = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs[0] || isNull(tabs[0]) || isNull(tabs[0].url)) {
      return
    }
    
    if (!tabs[0].url || (!tabs[0].url.includes('chat.openai.com'))) {
      return
    }
    
    let sessionToken: string | null = null
    let userAgent = navigator.userAgent
    let cfClearance: string | null = null

    chrome.cookies.get({ url: tabs[0].url, name: '__Secure-next-auth.session-token' }, (sessionTokenCookie) => {
      if (!sessionTokenCookie || !sessionTokenCookie.value) {
        return
      }

      sessionToken = sessionTokenCookie.value

      chrome.storage.local.set({
        [CHROME_STORAGE_OPENAI_SESSION_KEY]: sessionToken,
        [CHROME_STORAGE_OPENAI_USERAGENT_KEY]: userAgent
      }).then(() => {
        if (ENV !== 'production') {
          console.log("SESSION_TOKEN is set to " + sessionToken)
        }
      })
    })

    chrome.cookies.get({ url: tabs[0].url, name: 'cf_clearance' }, (cfClearanceCookie) => {
      if (!cfClearanceCookie || !cfClearanceCookie.value) {
        return
      }

      cfClearance = cfClearanceCookie.value

      chrome.storage.local.set({
        [CHROME_STORAGE_OPENAI_CF_CLEARANCE_KEY]: cfClearance,
      })
    })

    return {
      [CHROME_STORAGE_OPENAI_SESSION_KEY]: sessionToken,
      [CHROME_STORAGE_OPENAI_USERAGENT_KEY]: userAgent,
      [CHROME_STORAGE_OPENAI_CF_CLEARANCE_KEY]: cfClearance,
    }
  })
}
