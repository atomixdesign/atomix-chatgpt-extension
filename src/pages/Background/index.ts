// Background Service Worker Script

import "regenerator-runtime/runtime.js";
import { chatGPTApi } from "../../apis/chatgpt/openai";
import { MESSAGE_PASSING_GET_OPENAI_PROFILE, MESSAGE_PASSING_GET_SETTINGS, MESSAGE_PASSING_OPEN_OPENAI_CHAT_PAGE, MESSAGE_PASSING_PROFILE_PORT, MESSAGE_PASSING_PROMPT_OPENAI_CHAT, MESSAGE_PASSING_SETTINGS_PORT, MESSAGE_PASSING_UPDATE_SETTINGS } from "../../lib/consts";
import { getSidebarSettings, setSidebarSettings } from "../../storage/settings";
import { setOpenAIHeaderChromeStorage } from "./getOpenaiHeader";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  //Listen for messages from content scripts and send a response if

  if (request.code === MESSAGE_PASSING_OPEN_OPENAI_CHAT_PAGE) {
    chrome.tabs.create({ url: 'https://chat.openai.com/chat' })
  }

  if (request.code === MESSAGE_PASSING_PROMPT_OPENAI_CHAT) {
    // check header, if not, redirect to openai page and let it set the header.
    chatGPTApi.getConversation(request.prompt, request.messageId, request.conversationId, request.parentMessageId, request.modelName)
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
