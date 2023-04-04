import { CHROME_STORAGE_OPENAI_CF_CLEARANCE_KEY, CHROME_STORAGE_OPENAI_SESSION_KEY, CHROME_STORAGE_OPENAI_USERAGENT_KEY } from "../lib/consts"

export const getOpenAISessionInformation = async () => {
  const results = await chrome.storage.local.get([CHROME_STORAGE_OPENAI_SESSION_KEY, CHROME_STORAGE_OPENAI_USERAGENT_KEY, CHROME_STORAGE_OPENAI_CF_CLEARANCE_KEY])

  return results
}

