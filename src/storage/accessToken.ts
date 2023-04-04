import { CHROME_STORAGE_OPENAI_ACESS_TOKEN_KEY } from "../lib/consts"

export const setOpenAIAccessToken = async (accessToken: any) => {
  chrome.storage.local.set({
    [CHROME_STORAGE_OPENAI_ACESS_TOKEN_KEY]: JSON.stringify(accessToken),
  })
}

export const getOpenAIAccessToken = async () => {
  const results = await chrome.storage.local.get([CHROME_STORAGE_OPENAI_ACESS_TOKEN_KEY])
  if (!results[CHROME_STORAGE_OPENAI_ACESS_TOKEN_KEY]) {
    return
  }

  const token = JSON.parse(results[CHROME_STORAGE_OPENAI_ACESS_TOKEN_KEY])

  const expiryDate = new Date(token.expires)
  const today = new Date()
  if (today > expiryDate) {
    return
  }

  return {
    accessToken: token.accessToken,
    user: token.user
  }
}
