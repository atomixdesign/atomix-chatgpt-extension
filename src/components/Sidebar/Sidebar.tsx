import { styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSidebarOpen } from '../../hooks/useSidebarOpen';
import { useStreamListener } from '../../hooks/useStreamListener';
import { ChatContext, ChatContextType, Message } from '../Chat/ChatContext';
import { ChatWindow } from '../Chat/ChatWindow';
import { SidebarHandle } from '../SidebarHandle/SidebarHandle';
import { Footer } from './Footer';
import { Header } from './Header';

export type SidebarProps = {
  //
}

export const Sidebar: React.FC<SidebarProps> = () => {
  const [open, setOpen] = React.useState(false)
  const [username, setUsername] = useState<string>('TT')
  const [title, setTitle] = useState<string>('New chat')
  const [conversation, setConversation] = useState<Message[]>([])
  const [conversationId, setConversationId] = useState<string | undefined>()

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
  
  // Open or Close Sidebar action
  const onSidebarOpen = () => {
    setOpen(true)
  }

  const onSidebarClose = () => {
    setOpen(false)
  }
  
  useSidebarOpen(open, setOpen)
  
  const onToggleSidebar = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key == "g") {
      e.preventDefault()
      setOpen(!open)
    }
  }

  useEffect(() => {
    if (document) {
      document.addEventListener("keydown", onToggleSidebar)
    }

    return () => {
      document.removeEventListener("keydown", onToggleSidebar)
    }
  }, [open])

  return (
    <ChatContext.Provider value={chatContextValue}>
      <StyledSidebarContainer>
        <SidebarHandle location={'right'} onSidebarOpen={onSidebarOpen} />
        <StyledSidebar $location={'right'} $open={open}>
          <Header onSidebarClose={onSidebarClose} />
          <ChatWindow />
          <Footer isSidebarOpen={open} />
        </StyledSidebar>
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
  border-radius: ${props => props.theme.typography.pxToRem(24)} 0 0 ${props => props.theme.typography.pxToRem(24)};
  background-color: ${props => props.theme.palette.background.default};
  transition: transform 0.25s ease;
  transform: translateX(${props => {
    if (props.$open)
      return 0
    return props.$location === 'left' ? '-110%' : '110%'
  }});
`
