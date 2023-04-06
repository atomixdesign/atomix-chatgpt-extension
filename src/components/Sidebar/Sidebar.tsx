import { styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useProfile } from '../../hooks/useProfile';
import { useSidebarOpen } from '../../hooks/useSidebarOpen';
import { useStreamListener } from '../../hooks/useStreamListener';
import { stringifyKeys } from '../../lib/stringifyKeys';
import { SidebarSettings, SidebarSettingsContext } from '../../settings/sidebar';
import { ChatContext, ChatContextType, Message } from '../Chat/ChatContext';
import { ChatWindow } from '../Chat/ChatWindow';
import { SidebarHandle } from '../SidebarHandle/SidebarHandle';
import { Footer } from './Footer';
import { Header } from './Header';

export type SidebarProps = {
  //
}

export const Sidebar: React.FC<SidebarProps> = () => {
  const { loaded, loading, updateSettings, ...settings } = React.useContext(SidebarSettingsContext)
  const [open, setOpen] = React.useState(false)
  const [username, setUsername] = useState<string>('Atomix')
  const [title, setTitle] = useState<string>('New chat')
  const [conversation, setConversation] = useState<Message[]>([])
  const [conversationId, setConversationId] = useState<string | undefined>()
  const [sidebarLocation, setSidebarLocation] = useState<'left' | 'right' | undefined>()
  const [isSidebarIconDisplay, setIsSidebarIconDisplay] = useState<boolean>(false)
  const [keyboardShortcut, setKeyboardShortcut] = useState<SidebarSettings['keyboardShortcut']>();

  useEffect(() => {
    if (loaded) {
      setSidebarLocation(settings.sidebarLocation)
      setIsSidebarIconDisplay(settings.isSidebarIconDisplay)
      setKeyboardShortcut(settings.keyboardShortcut)
    }
  }, [loaded])

  // Chat State
  const chatContextValue: ChatContextType = {
    username,
    title,
    conversation,
    conversationId,
    setUsername,
    setTitle,
    setConversation,
    setConversationId,
  }

  // Stream Chat
  useStreamListener(chatContextValue)

  // Profile
  useProfile(chatContextValue)

  // Open or Close Sidebar action
  const onSidebarOpen = () => {
    setOpen(true)
  }

  const onSidebarClose = () => {
    setOpen(false)
  }

  useSidebarOpen(open, setOpen)

  const onToggleSidebar = (e: KeyboardEvent) => {
    if (keyboardShortcut && stringifyKeys(keyboardShortcut) === stringifyKeys(e)) {
      e.preventDefault()
      setOpen(!open)
    }

    if (e.key == "Escape") {
      e.stopPropagation()
      setOpen(false)
    }
  }

  useEffect(() => {
    if (document) {
      document.addEventListener("keydown", onToggleSidebar)
    }

    return () => {
      document.removeEventListener("keydown", onToggleSidebar)
    }
  }, [open, keyboardShortcut])

  return (
    <ChatContext.Provider value={chatContextValue}>
      <StyledSidebarContainer>
        {isSidebarIconDisplay && <SidebarHandle location={sidebarLocation || 'right'} onSidebarOpen={onSidebarOpen} />}
        {sidebarLocation && (
          <StyledSidebar $location={sidebarLocation} $open={open}>
            <Header onSidebarClose={onSidebarClose} location={sidebarLocation} />
            <ChatWindow />
            <Footer isSidebarOpen={open} onSidebarClose={onSidebarClose} settings={settings} />
          </StyledSidebar>
        )}
      </StyledSidebarContainer>
    </ChatContext.Provider>
  )
}

export const StyledSidebarContainer = styled('div')`
  position: absolute;
  overflow: hidden;
`

export const StyledSidebar = styled('div', { shouldForwardProp: (prop) => prop !== '$location' && prop !== '$open' }) <{ $location: 'left' | 'right', $open: boolean }>`
  position: fixed;
  top: 0;
  bottom: 0;
  ${props => props.$location === 'left' ? 'left: 0' : 'right: 0'};
  width: ${props => props.theme.typography.pxToRem(460)};
  height: 100vh;
  z-index: 99999999;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.15);
  border-radius: ${props => props.$location === 'left' ? `0 ${props.theme.typography.pxToRem(24)} ${props.theme.typography.pxToRem(24)} 0` : `${props.theme.typography.pxToRem(24)} 0 0 ${props.theme.typography.pxToRem(24)}`};
  background-color: ${props => props.theme.palette.background.default};
  transition: transform 0.25s ease;
  transform: translateX(${props => {
    if (props.$open)
      return 0
    return props.$location === 'right' ? '110%' : '-110%'
  }});
`
