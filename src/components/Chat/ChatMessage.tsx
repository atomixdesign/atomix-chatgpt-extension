import { Grid } from '@mui/material';
import React, { ComponentProps } from 'react';
import rehypeHighlight from 'rehype-highlight/lib';
import { ENV } from '../../lib/consts';
import {
  StyledAvatar, StyledAvatarGrid, StyledAvatarTypography,
  StyledChatGPTAvatar,
  StyledChatMessageContainer,
  StyledChatTextGrid, StyledErrorText, StyledReactMarkdown
} from './StyledChatMessage';

export type ChatMessageProps = Omit<ComponentProps<typeof Grid>, 'container' | 'flexDirection' | 'justifyContent'> & {
  children: string
  username?: string
  isChatGPT?: boolean
  isStreaming?: boolean
  isError?: boolean
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ children, username, isStreaming, isChatGPT, isError, ...props }) => {

  return (
    <StyledChatMessageContainer container flexDirection={'row'} justifyContent={'flex-start'} {...props}>
      <StyledAvatarGrid item>
        {isChatGPT ? (
          <StyledChatGPTAvatar>
            <img src={ENV === 'production' ? chrome.runtime.getURL('openai.svg') : 'openai.svg'} />
          </StyledChatGPTAvatar>
        ) : (
          <StyledAvatar>
            <StyledAvatarTypography variant="body2">
              {username && username[0]}
            </StyledAvatarTypography>
          </StyledAvatar>
        )}
      </StyledAvatarGrid>
      <StyledChatTextGrid item>
        {isError ? (
          <StyledErrorText variant="body2">
            {"Connection Error!\nPlease re-authenticate at"} <a target='_blank' href="https://chat.openai.com/">chat.openai.com</a>.
          </StyledErrorText>
        ) : (
          <StyledReactMarkdown rehypePlugins={[[rehypeHighlight, { detect: true }]]} $isStreaming={isStreaming}>
            {children}
          </StyledReactMarkdown>
        )}
      </StyledChatTextGrid>
    </StyledChatMessageContainer>
  )
}
