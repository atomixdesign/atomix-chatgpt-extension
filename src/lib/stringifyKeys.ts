import { KeyboardShortcut } from "../settings/sidebar";

export const stringifyKeys = (event: KeyboardShortcut) => {
  if (!event) return ''
  const { key, ctrlKey, altKey, shiftKey, metaKey } = event;

  let keyExcludeSelf = ` + ${key}`
  if (ctrlKey) keyExcludeSelf = keyExcludeSelf.replace(' + Control', '')
  if (altKey) keyExcludeSelf = keyExcludeSelf.replace(' + Alt', '')
  if (shiftKey) keyExcludeSelf = keyExcludeSelf.replace(' + Shift', '')
  if (metaKey) keyExcludeSelf = keyExcludeSelf.replace(' + Meta', '')

  return `${ctrlKey ? "Ctrl" : ""}${altKey ? "Alt" : ""}${shiftKey ? "Shift" : ""}${metaKey ? "Cmd" : ""}${keyExcludeSelf}`;
}
