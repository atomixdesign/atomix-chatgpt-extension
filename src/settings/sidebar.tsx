import _ from "lodash";
import React, { PropsWithChildren, createContext, useCallback, useEffect, useState } from "react";
import { MESSAGE_PASSING_GET_SETTINGS, MESSAGE_PASSING_SETTINGS_PORT, MESSAGE_PASSING_UPDATE_SETTINGS } from "../lib/consts";
import { ModelName } from "../types/openai";

export type KeyboardShortcut = {
  ctrlKey: boolean
  altKey: boolean
  shiftKey: boolean
  metaKey: boolean
  key: string
}

export type SidebarSettings = {
  model: ModelName
  isDarkMode: boolean
  isSidebarIconDisplay: boolean
  keyboardShortcut: KeyboardShortcut
  sidebarLocation: 'left' | 'right'
}

export type SidebarSettingsContextType = {
  loaded: boolean
  loading: boolean
  updateSettings: (updatedFields: Partial<SidebarSettings>) => void
}

export const DEFAULT_SETTINGS: SidebarSettings = {
  model: 'text-davinci-002-render-sha',
  isDarkMode: false,
  isSidebarIconDisplay: true,
  keyboardShortcut: {
    ctrlKey: true,
    altKey: false,
    shiftKey: false,
    metaKey: false,
    key: 'g'
  },
  sidebarLocation: 'right'
}

export const SidebarSettingsContext = createContext<SidebarSettings & SidebarSettingsContextType>({
  ...DEFAULT_SETTINGS,
  loaded: false,
  loading: false,
  updateSettings: () => { }
})

export const SidebarSettingsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [loaded, setLoaded] = useState<boolean>(false)
  const [settings, setSettings] = useState<SidebarSettings>(DEFAULT_SETTINGS)
  
  const sidebarSettingListener = (port: chrome.runtime.Port) => {
    if (port.name === MESSAGE_PASSING_SETTINGS_PORT) {
      port.onMessage.addListener((storedSettings) => {
        if (!storedSettings || _.isEmpty(storedSettings)) {
          setSettings(DEFAULT_SETTINGS)
        }
        else {
          setSettings(storedSettings)
        }
        setLoaded(true)
        setLoading(false)
      })
    }
  }

  useEffect(() => {
    setLoading(true)
    chrome.runtime.sendMessage({ code: MESSAGE_PASSING_GET_SETTINGS })
    chrome.runtime.onConnect.addListener(sidebarSettingListener)

    return () => {
      chrome.runtime.onConnect.removeListener(sidebarSettingListener)
    }
  }, [])

  const updateSettings = useCallback((updatedFields?: Partial<SidebarSettings>) => {
    const newSettings = {
      ...settings,
      ...updatedFields
    }
    chrome.runtime.sendMessage({ code: MESSAGE_PASSING_UPDATE_SETTINGS, settings: newSettings })
    setSettings(newSettings)
  }, [settings, setSettings])

  return (
    <SidebarSettingsContext.Provider value={_.merge({ loaded, loading, updateSettings }, settings)}>
      {children}
    </SidebarSettingsContext.Provider>
  )
}
