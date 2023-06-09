// Background Service Worker Script

import "regenerator-runtime/runtime.js";
import { getSessionAccessToken } from "../../apis/chatgpt/getSession";
import { chatGPTApi } from "../../apis/chatgpt/openai";
import { CHROME_STORAGE_OPENAI_SESSION_KEY, CHROME_STORAGE_OPENAI_USERAGENT_KEY, MESSAGE_PASSING_GET_OPENAI_CHAT_BY_ID, MESSAGE_PASSING_GET_OPENAI_CHAT_HISTORY, MESSAGE_PASSING_GET_OPENAI_CHAT_NAME, MESSAGE_PASSING_GET_OPENAI_PROFILE, MESSAGE_PASSING_GET_OPENAI_SESSION_TOKEN, MESSAGE_PASSING_GET_SETTINGS, MESSAGE_PASSING_PROFILE_PORT, MESSAGE_PASSING_PROMPT_OPENAI_CHAT, MESSAGE_PASSING_SETTINGS_PORT, MESSAGE_PASSING_UPDATE_SETTINGS } from "../../lib/consts";
import { isNull } from "../../lib/isNull";
import { openChatTab } from "../../lib/openOpenAITab";
import { getOpenAISessionInformation } from "../../storage/session";
import { getSidebarSettings, setSidebarSettings } from "../../storage/settings";
import { setOpenAIHeaderChromeStorage } from "./getOpenaiHeader";

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  //Listen for messages from content scripts and send a response based on the request code

  if (request.code === MESSAGE_PASSING_GET_OPENAI_SESSION_TOKEN) {
    getOpenAISessionInformation().then((session) => {
      if (isNull(session[CHROME_STORAGE_OPENAI_SESSION_KEY])) {
        openChatTab()
      }
      else {
        const userAgent = session[CHROME_STORAGE_OPENAI_USERAGENT_KEY];
        const sessionToken = session[CHROME_STORAGE_OPENAI_SESSION_KEY];
        getSessionAccessToken(userAgent, sessionToken).then((accessToken) => {
          if (isNull(accessToken)) {
            openChatTab()
          }
        }).catch((err) => {
          openChatTab()
        })
      }
    })
  }

  if (request.code === MESSAGE_PASSING_PROMPT_OPENAI_CHAT) {
    // check header, if not, redirect to openai page and let it set the header.
    chatGPTApi.getConversation(request.prompt, request.messageId, request.conversationId, request.parentMessageId, request.modelName)
  }

  if (request.code === MESSAGE_PASSING_GET_OPENAI_CHAT_HISTORY) {
    chatGPTApi.getConversationHistory()
  }

  if (request.code === MESSAGE_PASSING_GET_OPENAI_CHAT_BY_ID) {
    chatGPTApi.getConversationById(request.conversationId)
  }

  if (request.code === MESSAGE_PASSING_GET_OPENAI_CHAT_NAME) {
    chatGPTApi.getConversationName(request.conversationId, request.messageId)
  }

  if (request.code === MESSAGE_PASSING_UPDATE_SETTINGS) {
    setSidebarSettings(request.settings)
  }

  if (request.code === MESSAGE_PASSING_GET_SETTINGS) {
    getSidebarSettings().then(async (settings) => {
      const tabs = await chrome.tabs.query({ active: true, currentWindow: true })
      const port = chrome.tabs.connect(tabs[0]?.id || 0, { name: MESSAGE_PASSING_SETTINGS_PORT });
      port.postMessage(settings)
    })
  }

  if (request.code === MESSAGE_PASSING_GET_OPENAI_PROFILE) {
    chatGPTApi.getUserProfile().then(async (user) => {
      const tabs = await chrome.tabs.query({ active: true, currentWindow: true })
      const port = chrome.tabs.connect(tabs[0]?.id || 0, { name: MESSAGE_PASSING_PROFILE_PORT });
      port.postMessage(user)
    })
  }
})

chrome.tabs.onCreated.addListener(setOpenAIHeaderChromeStorage)
chrome.tabs.onUpdated.addListener(setOpenAIHeaderChromeStorage)
chrome.tabs.onActivated.addListener(setOpenAIHeaderChromeStorage)
