import { Box, Typography, styled } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { Container } from '../Container/Container';
import { ChatContext } from './ChatContext';
import { ChatMessage } from './ChatMessage';

export type ChatWindowProps = {
  //
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ ...props }) => {
  const { title, conversation, username } = React.useContext(ChatContext)
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (windowRef.current) {
      windowRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [JSON.stringify(conversation), windowRef]);
  
  return (
    <StyledChatWindow {...props} ref={windowRef}>
      <StyledChatTitle variant="h1">
        {title || 'New chat'}
      </StyledChatTitle>
      {conversation.length === 0 && (
        <StyledDefaultMessageContainer>
          <StyledDefaultMessage variant="body1">
            Enter a message below to start chatting with ChatGPT
          </StyledDefaultMessage>
        </StyledDefaultMessageContainer>
      )}

      {conversation.length > 0 && conversation.map(({ isChatGPT, isStreaming, isError, message }) => {
        return (
          <ChatMessage isChatGPT={isChatGPT || false} isStreaming={isStreaming} isError={isError} username={username}>
            {`${message}`}
          </ChatMessage>
        )
      })}
      <StyledBox ref={windowRef}/>
    </StyledChatWindow>
  )
}

export const StyledBox = styled(Box)`
  height: ${props => props.theme.typography.pxToRem(120)};
`

export const StyledChatTitle = styled(Typography)`
  color: ${props => props.theme.palette.text.primary};
  padding-top: ${props => props.theme.typography.pxToRem(12)};
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
