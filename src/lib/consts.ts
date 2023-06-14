export const ENV = process.env.NODE_ENV || 'production'

// Chrome storage keys
export const CHROME_STORAGE_OPENAI_SESSION_KEY = "OPENAI_SESSION_KEY"
export const CHROME_STORAGE_OPENAI_USERAGENT_KEY = "OPENAI_USERAGENT_KEY"
export const CHROME_STORAGE_OPENAI_CF_CLEARANCE_KEY = "OPENAI_CF_CLEARANCE_KEY"
export const CHROME_STORAGE_OPENAI_ACESS_TOKEN_KEY = "OPENAI_ACCESS_TOKEN_KEY"
export const CHROME_STORAGE_SIDEBAR_SETTINGS = "SIDEBAR_SETTINGS"

// Message passing code
export const MESSAGE_PASSING_GET_OPENAI_HEADER = "MP_GET_OPENAI_HEADER"
export const MESSAGE_PASSING_GET_OPENAI_PROFILE = "MP_GET_OPENAI_PROFILE"
export const MESSAGE_PASSING_GET_OPENAI_CHAT_HISTORY = "MP_GET_OPENAI_CHAT_HISTORY"
export const MESSAGE_PASSING_GET_OPENAI_CHAT_BY_ID = "MP_GET_OPENAI_CHAT_BY_ID"
export const MESSAGE_PASSING_GET_OPENAI_CHAT_NAME = "MP_GET_OPENAI_CHAT_NAME"
export const MESSAGE_PASSING_PROMPT_OPENAI_CHAT = "MP_PROMPT_OPENAI_CHAT"
export const MESSAGE_PASSING_GET_OPENAI_SESSION_TOKEN = "MP_GET_OPENAI_SESSION_TOKEN"
export const MESSAGE_PASSING_STOP_STREAM_OPENAI_CHAT = "MP_STOP_STREAM_OPENAI_CHAT"

// Message passing port
export const MESSAGE_PASSING_STREAM_OPENAI_CHAT_PORT = "MP_STREAM_OPENAI_CHAT_PORT"
export const MESSAGE_PASSING_STREAM_COMPLETE_OPENAI_CHAT_PORT = "MP_STREAM_COMPLETE_OPENAI_CHAT_PORT"
export const MESSAGE_PASSING_OPENAI_CHAT_HISTORY_PORT = "MP_OPENAI_CHAT_HISTORY_PORT"
export const MESSAGE_PASSING_OPENAI_CHAT_BY_ID_PORT = "MP_OPENAI_CHAT_BY_ID_PORT"
export const MESSAGE_PASSING_STEAM_OPENAI_CHAT_NAME_PORT = "MP_OPENAI_CHAT_NAME_PORT"
export const MESSAGE_PASSING_PROFILE_PORT = "MP_OPENAI_PROFILE_PORT"
export const MESSAGE_PASSING_SETTINGS_PORT = "MP_SETTINGS_PORT"

// Message passing openai streaming error code
export const MESSAGE_PASSING_CONVERSATION_FAILED = "MP_CONVERSATION_FAILED"

// Message passing for sidebar
export const MESSAGE_PASSING_TOGGLE_SIDEBAR = "MP_TOGGLE_SIDEBAR"
export const MESSAGE_PASSING_UPDATE_SETTINGS = "MP_UPDATE_SETTINGS"
export const MESSAGE_PASSING_GET_SETTINGS = "MP_GET_SETTINGS"

