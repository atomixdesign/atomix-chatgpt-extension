export type Content = {
  content_type: string;
  parts: string[];
}

export type Message = {
  content: Content;
  id: string;
  role: string;
}

export type ConversationPayload = {
  action: string;
  conversation_id?: string;
  messages: Message[];
  model: string;
  parent_message_id: string;
}

export type ModelName = 'gpt-4' | 'text-davinci-002-render-sha'
