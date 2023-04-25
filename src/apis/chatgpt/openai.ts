import { v4 as uuidV4 } from "uuid";
import { CHROME_STORAGE_OPENAI_SESSION_KEY, CHROME_STORAGE_OPENAI_USERAGENT_KEY, MESSAGE_PASSING_CONVERSATION_FAILED, MESSAGE_PASSING_OPENAI_CHAT_BY_ID_PORT, MESSAGE_PASSING_OPENAI_CHAT_HISTORY_PORT, MESSAGE_PASSING_STEAM_OPENAI_CHAT_NAME_PORT, MESSAGE_PASSING_STOP_STREAM_OPENAI_CHAT, MESSAGE_PASSING_STREAM_OPENAI_CHAT_PORT } from "../../lib/consts";
import { getOpenAISessionInformation } from "../../storage/session";
import { ConversationPayload, ModelName } from "../../types/openai";
import { getProfile } from "./getProfile";
import { getSessionAccessToken } from "./getSession";

// This ChatGPTApi is invoked in the background service worker script.
class ChatGPTApi {
  accessToken: string | null;
  apiBaseUrl: string;
  backendApiBaseUrl: string;
  userAgent: string;

  constructor() {
    this.accessToken = null;
    this.apiBaseUrl = "https://chat.openai.com/api";
    this.backendApiBaseUrl = "https://chat.openai.com/backend-api";
    this.userAgent = navigator.userAgent;
  }

  async getAccessToken() {
    const session = await getOpenAISessionInformation();
    const userAgent = session[CHROME_STORAGE_OPENAI_USERAGENT_KEY];
    const sessionToken = session[CHROME_STORAGE_OPENAI_SESSION_KEY];

    if (userAgent && sessionToken && !this.accessToken) {
      this.accessToken = await getSessionAccessToken(userAgent, sessionToken);
    }

    return this.accessToken;
  }

  async getUserProfile() {
    const session = await getOpenAISessionInformation();
    const userAgent = session[CHROME_STORAGE_OPENAI_USERAGENT_KEY];
    const sessionToken = session[CHROME_STORAGE_OPENAI_SESSION_KEY];

    let profile;
    if (userAgent && sessionToken && !this.accessToken) {
      this.accessToken = await getSessionAccessToken(userAgent, sessionToken);
    }

    if (userAgent && sessionToken) {
      profile = await getProfile(userAgent, sessionToken)
    }

    return profile
  }

  // TODO: Generalize class and function to accept any model from any OpenAI chat APIs.
  async getConversation(message: string, messageId: string, conversationId?: string, parentMessageId?: string, modelName: ModelName = 'text-davinci-002-render-sha') {
    const session = await getOpenAISessionInformation();
    const userAgent = session[CHROME_STORAGE_OPENAI_USERAGENT_KEY];
    const sessionToken = session[CHROME_STORAGE_OPENAI_SESSION_KEY];
    const controller = new AbortController();
    const signal = controller.signal;

    const accessToken = await this.getAccessToken();
    const headers = {
      cookie: `__Secure-next-auth.session-token=${sessionToken}`,
      Accept: "*/*",
      "user-agent": userAgent,
      "authorization": `Bearer ${accessToken}`,
      "accept-encoding": "gzip, deflate, br",
      "content-type": "application/json",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "none",
    }

    const body: ConversationPayload = {
      action: "next",
      ...(conversationId && { conversation_id: conversationId }),
      messages: [
        {
          id: messageId,
          role: "user",
          content: {
            content_type: "text",
            parts: [message],
          },
        },
      ],
      model: modelName,
      parent_message_id: parentMessageId || uuidV4(),
    };

    // Communication channel with Active Tab
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true })
    const port = chrome.tabs.connect(tabs[0]?.id || 0, { name: MESSAGE_PASSING_STREAM_OPENAI_CHAT_PORT });

    chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
      if (request && request.code === MESSAGE_PASSING_STOP_STREAM_OPENAI_CHAT) {
        sendMessage("[DONE]")
        controller.abort()
      }
    })

    const sendMessage = async (message: any) => {
      port.postMessage(message)
    }

    await fetch(`${this.backendApiBaseUrl}/conversation`, {
      method: "POST",
      signal: signal,
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.status !== 200 && chrome && chrome.tabs) {
          sendMessage({ code: MESSAGE_PASSING_CONVERSATION_FAILED })
          return
        }

        return response.body
      })
      .then(async (body) => {
        if (!body) return

        const reader = body.getReader();
        // TODO: Refractor Readable Stream
        return new ReadableStream<Uint8Array>({
          start(controller) {
            return pump();

            function pump(): any {
              return reader.read().then(({ done, value }) => {
                // Stream message to Content Script Sidebar
                const decoder = new TextDecoder();
                const event = decoder.decode(value)
                sendMessage(event);

                // When no more data needs to be consumed, close the stream
                if (done) {
                  controller.close();
                  return;
                }

                // Enqueue the next data chunk into our target stream
                controller.enqueue(value);
                return pump();
              });
            }
          },
        });
      });

    return true
  }

  async getConversationHistory() {
    const session = await getOpenAISessionInformation();
    const userAgent = session[CHROME_STORAGE_OPENAI_USERAGENT_KEY];
    const sessionToken = session[CHROME_STORAGE_OPENAI_SESSION_KEY];

    const accessToken = await this.getAccessToken();

    await fetch('https://chat.openai.com/backend-api/conversations?offset=0&limit=10', {
      method: 'GET',
      headers: {
        'cookie': `__Secure-next-auth.session-token=${sessionToken}`,
        'user-agent': userAgent,
        'authorization': `Bearer ${accessToken}`,
        'accept': '*/*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-US,en;q=0.9,vi;q=0.8',
      }
    })
      .then(response => response.json())
      .then(async (data) => {
        const tabs = await chrome.tabs.query({ active: true, currentWindow: true })
        const port = chrome.tabs.connect(tabs[0]?.id || 0, { name: MESSAGE_PASSING_OPENAI_CHAT_HISTORY_PORT });
        port.postMessage(data.items)
      })
      .catch(error => console.log(error));
  }

  async getConversationById(conversationId: string) {
    const session = await getOpenAISessionInformation();
    const userAgent = session[CHROME_STORAGE_OPENAI_USERAGENT_KEY];
    const sessionToken = session[CHROME_STORAGE_OPENAI_SESSION_KEY];

    const accessToken = await this.getAccessToken();

    await fetch(`https://chat.openai.com/backend-api/conversation/${conversationId}`, {
      method: 'GET',
      headers: {
        'cookie': `__Secure-next-auth.session-token=${sessionToken}`,
        'user-agent': userAgent,
        'authorization': `Bearer ${accessToken}`,
        'accept': '*/*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-US,en;q=0.9,vi;q=0.8',
      }
    })
      .then(response => response.json())
      .then(async (data) => {
        const tabs = await chrome.tabs.query({ active: true, currentWindow: true })
        const port = chrome.tabs.connect(tabs[0]?.id || 0, { name: MESSAGE_PASSING_OPENAI_CHAT_BY_ID_PORT });
        port.postMessage(data)
      })
      .catch(error => console.log(error));
  }

  async getConversationName(conversationId: string, messageId: string) {
    const session = await getOpenAISessionInformation();
    const userAgent = session[CHROME_STORAGE_OPENAI_USERAGENT_KEY];
    const sessionToken = session[CHROME_STORAGE_OPENAI_SESSION_KEY];

    const accessToken = await this.getAccessToken();
    
    const body = {
      "message_id": messageId,
    };
    
    await fetch(`https://chat.openai.com/backend-api/conversation/gen_title/${conversationId}`, {
      method: 'POST',
      headers: {
        'cookie': `__Secure-next-auth.session-token=${sessionToken}`,
        'user-agent': userAgent,
        'content-type': 'application/json',
        'authorization': `Bearer ${accessToken}`,
        'accept': '*/*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-US,en;q=0.9,vi;q=0.8',
      },
      body: JSON.stringify(body),
    })
      .then(response => response.json())
      .then(async (data) => {
        const tabs = await chrome.tabs.query({ active: true, currentWindow: true })
        const port = chrome.tabs.connect(tabs[0]?.id || 0, { name: MESSAGE_PASSING_STEAM_OPENAI_CHAT_NAME_PORT });
        port.postMessage(data)
      })
      .catch(error => console.error(error));
  }
}

export const chatGPTApi = new ChatGPTApi();
chatGPTApi.getAccessToken()
