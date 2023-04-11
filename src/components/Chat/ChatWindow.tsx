import { faPlusCircle } from '@fortawesome/pro-regular-svg-icons';
import { Box, Typography, styled } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useChatHistory } from '../../hooks/useChatHistory';
import { useChatName } from '../../hooks/useChatName';
import { useChatSelect } from '../../hooks/useChatSelect';
import { MESSAGE_PASSING_GET_OPENAI_CHAT_BY_ID } from '../../lib/consts';
import { ChatHistory } from '../../types/openai';
import { Container } from '../Container/Container';
import { Icon } from '../Icon/Icon';
import { ChatContext } from './ChatContext';
import { ChatMessage } from './ChatMessage';
import { Dropdown, StyledDropdownItem, StyledDropdownItemTypography } from './ChatTitleDropdown';

export type ChatWindowProps = {
  //
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ ...props }) => {
  const [activeConversationTitle, setActiveConversationTitle] = React.useState<string>('New chat')
  const [activeConversationId, setActiveConversationId] = React.useState<string>('')
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([])

  const chatContext = React.useContext(ChatContext)
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveConversationTitle(chatContext.title || 'New chat')
    setActiveConversationId(chatContext.conversationId || '')
  }, [chatContext.title, chatContext.conversationId])

  useEffect(() => {
    if (windowRef.current) {
      windowRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [JSON.stringify(chatContext.conversation), windowRef]);

  useChatHistory(setChatHistory)
  useChatSelect(chatContext)
  useChatName(chatContext, chatHistory, setChatHistory)

  const onChangeChat = (conversationId: string) => (event: any) => {
    chrome.runtime.sendMessage({ code: MESSAGE_PASSING_GET_OPENAI_CHAT_BY_ID, conversationId: conversationId })
    if (chatContext.setConversationId) {
      chatContext.setConversationId(conversationId)
    }
    setDropdownOpen(false)
  }

  const onStartNewChat = () => {
    if (chatContext.setTitle) {
      chatContext.setTitle('New chat')
    }
    if (chatContext.setConversation) {
      chatContext.setConversation([])
    }
    if (chatContext.setConversationId) {
      chatContext.setConversationId(undefined)
    }
    setDropdownOpen(false)
  }

  return (
    <StyledChatWindow {...props} ref={windowRef}>
      <Dropdown open={dropdownOpen} setOpen={setDropdownOpen} name={activeConversationTitle || 'New chat'}>
        {chatHistory.map((chat) => {
          return (
            <StyledDropdownItem disableRipple onClick={onChangeChat(chat.id)}>
              <StyledDropdownItemTypography variant="body1">
                {chat.title}
              </StyledDropdownItemTypography>
            </StyledDropdownItem>
          )
        })}
        <StyledDropdownItem disableRipple onClick={onStartNewChat}>
          <StyledAddNewChatContainer>
            <StyledDropdownItemTypography variant="body1">
              Start new chat
            </StyledDropdownItemTypography>
            <StyledAddNewChatIcon icon={faPlusCircle} />
          </StyledAddNewChatContainer>
        </StyledDropdownItem>
      </Dropdown>

      {chatContext.conversation.length === 0 && (
        <StyledDefaultMessageContainer>
          <StyledDefaultMessage variant="body1">
            Enter a message below to start chatting with ChatGPT
          </StyledDefaultMessage>
        </StyledDefaultMessageContainer>
      )}

      {chatContext.conversation.length > 0 && chatContext.conversation.map(({ isChatGPT, isStreaming, isError, message }) => {
        return (
          <ChatMessage isChatGPT={isChatGPT || false} isStreaming={isStreaming} isError={isError} username={chatContext.username}>
            {`${message}`}
          </ChatMessage>
        )
      })}
      <StyledBox ref={windowRef} />
    </StyledChatWindow>
  )
}

export const StyledBox = styled(Box)`
  height: ${props => props.theme.typography.pxToRem(120)};
`

export const StyledChatWindow = styled(Container)`
  display: block;
  position: relative;
  border-radius: ${props => props.theme.typography.pxToRem(24)} 0 0 0;
  background-color: ${props => props.theme.palette.background.default};
  overflow-y: scroll;
  height: calc(100vh - ${props => props.theme.typography.pxToRem(148)});
  -ms-overflow-style: none;
  scrollbar-width: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
`

export const StyledDefaultMessageContainer = styled('div')`
  width: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
`

export const StyledDefaultMessage = styled(Typography)`
  color: ${props => props.theme.palette.text.disabled};
  margin-top: 40%;
  max-width: 60%;
`

export const StyledAddNewChatContainer = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const StyledAddNewChatIcon = styled(Icon)`
  font-size: ${props => props.theme.typography.pxToRem(16)};
  margin-left: ${props => props.theme.typography.pxToRem(6)};
`
