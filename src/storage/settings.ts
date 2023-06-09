import { CHROME_STORAGE_SIDEBAR_SETTINGS } from "../lib/consts"
import { SidebarSettings } from "../settings/sidebar"

export const setSidebarSettings = async (settings: SidebarSettings) => {
  chrome.storage.local.set({
    [CHROME_STORAGE_SIDEBAR_SETTINGS]: JSON.stringify(settings),
  })
}

export const getSidebarSettings = async () => {
  const results = await chrome.storage.local.get([CHROME_STORAGE_SIDEBAR_SETTINGS])
  if (!results[CHROME_STORAGE_SIDEBAR_SETTINGS]) {
    return
  }
    
  return JSON.parse(results[CHROME_STORAGE_SIDEBAR_SETTINGS])
}
