import { faCircleHalfStroke } from '@fortawesome/pro-duotone-svg-icons';
import { faPaperPlaneTop } from '@fortawesome/pro-regular-svg-icons';
import { ButtonBase, Grid, Input, Link, NativeSelect, Typography, styled } from '@mui/material';
import { cloneDeep } from 'lodash';
import React, { ComponentProps, useCallback, useEffect, useRef } from 'react';
import { v4 as uuidV4 } from "uuid";
import { MESSAGE_PASSING_OPEN_OPTION_PAGE, MESSAGE_PASSING_PROMPT_OPENAI_CHAT } from '../../lib/consts';
import { ColorModeContext } from '../../styles/theme';
import { Button } from '../Button/Button';
import { ChatContext } from '../Chat/ChatContext';
import { Container } from '../Container/Container';
import { Icon } from '../Icon/Icon';

export type FooterProps = ComponentProps<typeof StyledFooter> & {
  promptOptions?: string[]
  isSidebarOpen?: boolean
  onSidebarClose?: () => void
}

export const Footer: React.FC<FooterProps> = ({ children, isSidebarOpen, onSidebarClose, promptOptions, ...props }) => {
  const [prompt, setPrompt] = React.useState<string>('')
  const { toggleColorMode } = React.useContext(ColorModeContext)
  const { conversation, setConversation, conversationId } = React.useContext(ChatContext)
  const inputRef = useRef<HTMLTextAreaElement>()

  // Focus on prompt input when sidebar opens
  useEffect(() => {
    if (isSidebarOpen && inputRef.current) {
      inputRef.current?.focus()
    }
  }, [isSidebarOpen, inputRef.current])

  const onPromptChange = (e: any) => {
    e.stopPropagation();
    setPrompt(e.target.value)
  }

  const onSubmitGeneral = useCallback(() => {
    const oldConversation = cloneDeep(conversation)
    const messageId = uuidV4()
    if (setConversation) {
      setConversation([...conversation, { id: messageId, message: prompt, isChatGPT: false }])
      setPrompt('')
    }

    chrome.runtime.sendMessage({
      code: MESSAGE_PASSING_PROMPT_OPENAI_CHAT,
      prompt: prompt,
      messageId: messageId,
      conversationId: conversationId,
      parentMessageId: oldConversation[oldConversation.length - 1]?.id || undefined
    })
  }, [prompt, setPrompt, setConversation])

  const onSubmitPrompt = useCallback((e: any) => {
    e.preventDefault()
    onSubmitGeneral()
  }, [prompt, setPrompt, setConversation])

  const onTextFieldKeyDown = (event: any) => {
    if (!event.shiftKey && event.key === "Enter") {
      onSubmitGeneral()
      event.preventDefault()
    }

    if (onSidebarClose && event.key === "Escape") {
      onSidebarClose()

      inputRef.current?.blur()
      event.preventDefault()
    }

    if (onSidebarClose && (event.metaKey || event.ctrlKey) && event.key == "g") {
      onSidebarClose()

      inputRef.current?.blur()
      event.preventDefault()
    }

    event.stopPropagation();
  }

  const onTextFieldStopPropagation = (event: any) => {
    event.stopPropagation();
  }

  const onSettingsClick = () => {
    chrome.runtime.sendMessage({ code: MESSAGE_PASSING_OPEN_OPTION_PAGE })
  }

  return (
    <StyledFooter {...props}>
      <Container>
        <StyledForm onSubmit={onSubmitPrompt}>
          <StyledInputField
            autoFocus={true}
            multiline={true}
            disableUnderline={true}
            onKeyDown={onTextFieldKeyDown}
            onKeyUp={onTextFieldStopPropagation}
            onKeyPress={onTextFieldStopPropagation}
            maxRows={6}
            value={prompt}
            placeholder='Enter or select a prompt...'
            onChange={onPromptChange}
            inputRef={inputRef}
          />
          <StyledSubmitButton disableRipple type="submit" onClick={onSubmitPrompt}>
            <StyledPaperAirplaneIcon icon={faPaperPlaneTop} />
          </StyledSubmitButton>
        </StyledForm>
        {/* <StyledPropmtContainer>
          <StyledPromptSelect
            disableUnderline={true}
          >
            <option>Custom prompt</option>
          </StyledPromptSelect>
          <StyledSavePromptButton fontColor={'light'}>
            Save Prompt
          </StyledSavePromptButton>
        </StyledPropmtContainer> */}
        <StyledAccessoryBar container justifyContent={'space-between'}>
          <Grid item>
            <StyledLinkContainer>
              <StyledLink onClick={onSettingsClick}>
                <Typography variant="body1">
                  Review us
                </Typography>
              </StyledLink>
              <StyledLink onClick={onSettingsClick}>
                <Typography variant="body1">
                  Give feedback
                </Typography>
              </StyledLink>
            </StyledLinkContainer>
          </Grid>
          <Grid item>
            <StyledLinkContainer>
              {/* <StyledIconButton disableRipple>
                <Icon icon={faArrowUpFromBracket} />
              </StyledIconButton> */}
              <StyledIconButton disableRipple onClick={toggleColorMode}>
                <Icon icon={faCircleHalfStroke} />
              </StyledIconButton>
            </StyledLinkContainer>
          </Grid>
        </StyledAccessoryBar>
      </Container>
    </StyledFooter>
  )
}

export const StyledForm = styled('form')`
  position: relative;
`

export const StyledPaperAirplaneIcon = styled(Icon)`
  font-size: ${props => props.theme.typography.pxToRem(16)};
  color: ${props => props.theme.palette.text.primary};
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
`

export const StyledSubmitButton = styled(ButtonBase)`
  position: absolute;
  bottom: ${props => props.theme.typography.pxToRem(18)};
  right: ${props => props.theme.typography.pxToRem(8)};

  &:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: ${props => props.theme.palette.custom.buttonLight};
    z-index: 2;
    opacity: 0;
    border-radius: ${props => props.theme.typography.pxToRem(28)};
    transition: top 0.2s ease, bottom 0.2s ease, left 0.2s ease, right 0.2s ease, opacity 0.2s ease;
  }

  &:hover:after {
    opacity: 1;
    left: ${props => props.theme.typography.pxToRem(-14)};
    right: ${props => props.theme.typography.pxToRem(-14)};
    bottom: ${props => props.theme.typography.pxToRem(-14)};
    top: ${props => props.theme.typography.pxToRem(-14)};
  }
`

export const StyledSavePromptButton = styled(Button)`
  flex: none;
  line-height: 0;

  &:after {
    border-radius: ${props => props.theme.typography.pxToRem(8)};
  }

  &:hover:after {
    left: ${props => props.theme.typography.pxToRem(-13)};
    right: ${props => props.theme.typography.pxToRem(-13)};
    bottom: ${props => props.theme.typography.pxToRem(-13)};
    top: ${props => props.theme.typography.pxToRem(-13)};
  }

  &:active:after {
    left: ${props => props.theme.typography.pxToRem(-11)};
    right: ${props => props.theme.typography.pxToRem(-11)};
    bottom: ${props => props.theme.typography.pxToRem(-11)};
    top: ${props => props.theme.typography.pxToRem(-11)};
  }
`

export const StyledPropmtContainer = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.typography.pxToRem(20)};
  margin-top: ${props => props.theme.typography.pxToRem(12)};
`

export const StyledIconButton = styled(ButtonBase)`
  position: relative;
    
  &:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: ${props => props.theme.palette.custom.buttonLight};
    z-index: 2;
    opacity: 0;
    border-radius: ${props => props.theme.typography.pxToRem(28)};
    transition: top 0.2s ease, bottom 0.2s ease, left 0.2s ease, right 0.2s ease, opacity 0.2s ease;
  }

  &:hover:after {
    opacity: 1;
    left: ${props => props.theme.typography.pxToRem(-14)};
    right: ${props => props.theme.typography.pxToRem(-14)};
    bottom: ${props => props.theme.typography.pxToRem(-14)};
    top: ${props => props.theme.typography.pxToRem(-14)};
  }

  &:active:after {
    left: ${props => props.theme.typography.pxToRem(-12)};
    right: ${props => props.theme.typography.pxToRem(-12)};
    bottom: ${props => props.theme.typography.pxToRem(-12)};
    top: ${props => props.theme.typography.pxToRem(-12)};
  }
`

export const StyledLinkContainer = styled('div')`
  display: flex;
  flex-direction: row;
  gap: ${props => props.theme.typography.pxToRem(30)};
`

export const StyledLink = styled(Link)`
  color: ${props => props.theme.palette.text.primary};
  text-decoration-color: ${props => props.theme.palette.text.primary};
  cursor: pointer;
  transition: color 0.2s ease, text-decoration-color 0.2s ease;

  &:hover {
    color: ${props => props.theme.palette.primary.main};
    text-decoration-color: ${props => props.theme.palette.primary.main};
  }
`

export const StyledAccessoryBar = styled(Grid)`
  margin: ${props => props.theme.typography.pxToRem(26)} 0;
`

export const StyledInputContainer = styled('div')`
  padding: ${props => props.theme.typography.pxToRem(13)};
`

export const StyledPromptSelect = styled(NativeSelect)`
  width: 100%;
  border: 1px solid ${props => props.theme.palette.divider};
  border-radius: ${props => props.theme.typography.pxToRem(8)};
  background-color: ${props => props.theme.palette.custom.inputField};
  
  & select {
    padding-top: ${props => props.theme.typography.pxToRem(13)};
    padding-bottom: ${props => props.theme.typography.pxToRem(13)};
    padding-left: ${props => props.theme.typography.pxToRem(13)};
  }

`

export const StyledInputField = styled(Input)`
  position: relative;
  margin-top: ${props => props.theme.typography.pxToRem(20)};
  width: 100%;
  padding: ${props => props.theme.typography.pxToRem(13)};
  border: 1px solid ${props => props.theme.palette.divider};
  border-radius: ${props => props.theme.typography.pxToRem(8)};
  text-decoration: none;
  background-color: ${props => props.theme.palette.custom.inputField};
    
  textarea {
    -ms-overflow-style: none;
    scrollbar-width: none;
    
    &::-webkit-scrollbar {
      display: none;
    }
  }
`

export const StyledFooter = styled('div')`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 1px solid ${props => props.theme.palette.divider};
  background-color: ${props => props.theme.palette.background.paper};
`
