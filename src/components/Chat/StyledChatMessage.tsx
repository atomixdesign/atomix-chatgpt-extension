import { keyframes } from "@emotion/react"
import { Avatar, Grid, Typography, styled } from "@mui/material"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"

export const blink = keyframes`
  to {
    visibility: hidden;
  }
`

export const StyledChatTextGrid = styled(Grid)`
  margin-left: ${props => props.theme.typography.pxToRem(12)};
  width: calc(100% - ${props => props.theme.typography.pxToRem(48)});
  flex-grow: 1;
`

export const StyledErrorText = styled(Typography)`
  color: ${props => props.theme.palette.custom.error};
  letter-spacing: 3%;
  line-height: 1.4;
  white-space: pre-line;
`

export const StyledReactMarkdown = styled(ReactMarkdown, { shouldForwardProp: (prop) => prop !== '$isStreaming' })<{ $isStreaming?: boolean }>`
  font-size: ${props => props.theme.typography.pxToRem(16)};
  font-family: ${props => props.theme.typography.fontFamily};
  color: ${props => props.theme.palette.text.primary};
  letter-spacing: 3%;
  line-height: 1.4;

  p:first-of-type {
    margin-top: 0;
  }

  > *:last-child {
    &:after {
      display: ${props => props.$isStreaming ? 'inline' : 'none'};
      content: '▋';
      margin-left: ${props => props.theme.typography.pxToRem(4)};
      animation: ${blink} 1s steps(5,start) infinite;
      -webkit-animation: ${blink} 1s steps(5, start) infinite;
      vertical-align: baseline;
    }
  }
`

export const StyledAvatarGrid = styled(Grid)`
  width: ${props => props.theme.typography.pxToRem(36)};
`

export const StyledChatGPTAvatar = styled(Avatar)`
  width: ${props => props.theme.typography.pxToRem(36)};
  height: ${props => props.theme.typography.pxToRem(36)};
  background-color: ${props => props.theme.palette.custom.openai};
`

export const StyledAvatar = styled(Avatar)`
  width: ${props => props.theme.typography.pxToRem(36)};
  height: ${props => props.theme.typography.pxToRem(36)};
  background-color: ${props => props.theme.palette.custom.avatar};
`

export const StyledAvatarTypography = styled(Typography)`
  color: white;
`

export const StyledChatMessageContainer = styled(Grid)`
  margin-top: ${props => props.theme.typography.pxToRem(20)};
`
