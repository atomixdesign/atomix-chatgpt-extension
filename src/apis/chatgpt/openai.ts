import { v4 as uuidV4 } from "uuid";
import { CHROME_STORAGE_OPENAI_SESSION_KEY, CHROME_STORAGE_OPENAI_USERAGENT_KEY, MESSAGE_PASSING_CONVERSATION_FAILED, MESSAGE_PASSING_STREAM_OPENAI_CHAT_PORT } from "../../lib/consts";
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
    
    let profile = null;
    if (userAgent && sessionToken && !this.accessToken) {
      profile = await getProfile(userAgent, sessionToken)
    }

    return profile
  }

  // TODO: Generalize class and function to accept any model from any OpenAI chat APIs.
  async getConversation(message: string, messageId: string, conversationId?: string, parentMessageId?: string, modelName: ModelName='text-davinci-002-render-sha') {
    const session = await getOpenAISessionInformation();
    const userAgent = session[CHROME_STORAGE_OPENAI_USERAGENT_KEY];
    const sessionToken = session[CHROME_STORAGE_OPENAI_SESSION_KEY];

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

    const sendMessage = async (message: any) => {
      port.postMessage(message)
    }

    await fetch(`${this.backendApiBaseUrl}/conversation`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.status !== 200 && chrome && chrome.tabs) {
          chrome.tabs.create({ url: 'https://chat.openai.com/chat' })
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
                  port.disconnect();
                  controller.close();
                  return ;
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
    // TODO: Implement the ability to get a list of historical conversations.

  }
}

export const chatGPTApi = new ChatGPTApi();
chatGPTApi.getAccessToken()
