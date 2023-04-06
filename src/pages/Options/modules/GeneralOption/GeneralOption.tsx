import { Typography, styled } from "@mui/material"
import React, { useContext, useEffect } from "react"
import { StyledFormControl, StyledFormControlLabel, StyledFormLabel } from "../../../../components/Form/StyledForm"
import { StyledKeyboardInput } from "../../../../components/Form/StyledKeyboardInput"
import { StyledRadio, StyledRadioGroup } from "../../../../components/Form/StyledRadioGroup"
import { stringifyKeys } from "../../../../lib/stringifyKeys"
import { KeyboardShortcut, SidebarSettings, SidebarSettingsContext } from "../../../../settings/sidebar"
import { ModelName } from "../../../../types/openai"

export type GeneralOptionProps = {
  //
}

export const GeneralOption: React.FC<GeneralOptionProps> = (props) => {
  const {loaded, loading, updateSettings, ...settings} = useContext(SidebarSettingsContext)
  const [model, setModel] = React.useState<string>('text-davinci-002-render-sha');
  const [sidebarHandleShow, setSidebarHandleShow] = React.useState('show');
  const [colorTheme, setColorTheme] = React.useState('light');
  const [keyboardShortcut, setKeyboardShortcut] = React.useState<SidebarSettings['keyboardShortcut']>();
  const [keyboardShortcutValue, setKeyboardShortcutValue] = React.useState<string>('');
  const [sidebarLocation, setSidebarLocation] = React.useState<SidebarSettings['sidebarLocation']>('right');

  // Initialize settings
  useEffect(() => {
    if (loaded) {
      setColorTheme(settings.isDarkMode ? 'dark' : 'light')
      setSidebarHandleShow(settings.isSidebarIconDisplay ? 'show' : 'hide')
      setKeyboardShortcut(settings.keyboardShortcut)
      setKeyboardShortcutValue(stringifyKeys(settings.keyboardShortcut))
      setSidebarLocation(settings.sidebarLocation)
      setModel(settings.model)
    }
  }, [loaded, settings])
  
  // Handle change events
  const onModelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateSettings({model: (event.target as HTMLInputElement).value as ModelName})
  }

  const onKeyboardShortcutChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const keyboardShortcut: KeyboardShortcut = {
      ctrlKey: event.ctrlKey,
      altKey: event.altKey,
      shiftKey: event.shiftKey,
      metaKey: event.metaKey,
      key: event.key
    }
    updateSettings({keyboardShortcut})
    event.stopPropagation()
  }

  const onSidebarLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateSettings({sidebarLocation: (event.target as HTMLInputElement).value as SidebarSettings['sidebarLocation']})
  }

  const onSidebarHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateSettings({isSidebarIconDisplay: (event.target as HTMLInputElement).value === 'show'})
  }

  const onColorThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateSettings({ isDarkMode: (event.target as HTMLInputElement).value === 'dark' })
  }

  return (
    <StyledGeneralOptionContainer>
      <StyledPanelHeaderTypography variant="h1">
        General options
      </StyledPanelHeaderTypography>
      <StyledFormControl>
        <StyledFormLabel id="chatgpt-model-button-group">Select OpenAI model</StyledFormLabel>
        <StyledRadioGroup
          value={model}
          onChange={onModelChange}
        >
        <StyledFormControlLabel value='text-davinci-002-render-sha' control={<StyledRadio />} label="ChatGPT 3.5 using OpenAI session" />
        <StyledFormControlLabel value='gpt-4' control={<StyledRadio />} label="GPT 4 using Open AI session (require ChatGPT Plus)" />
        </StyledRadioGroup>
      </StyledFormControl>
      <StyledFormControl>
        <StyledFormLabel id="model-radio-button-group">Change sidebar keyboard shortcut</StyledFormLabel>
        <StyledKeyboardInput
          value={keyboardShortcutValue}
          disableUnderline={true}
          onKeyDown={onKeyboardShortcutChange}
        />
      </StyledFormControl>
      <StyledFormControl>
        <StyledFormLabel id="sidebar-location-radio-button-group">Change sidebar location</StyledFormLabel>
        <StyledRadioGroup
          value={sidebarLocation}
          onChange={onSidebarLocationChange}
        >
        <StyledFormControlLabel value='left' control={<StyledRadio />} label="Left" />
        <StyledFormControlLabel value='right' control={<StyledRadio />} label="Right" />
        </StyledRadioGroup>
      </StyledFormControl>
      <StyledFormControl>
        <StyledFormLabel id="sidebar-icon-radio-button-group">Hide sidebar handle icon</StyledFormLabel>
        <StyledRadioGroup
          value={sidebarHandleShow}
          onChange={onSidebarHandleChange}
        >
        <StyledFormControlLabel value='show' control={<StyledRadio />} label="Show" />
        <StyledFormControlLabel value='hide' control={<StyledRadio />} label="Hide" />
        </StyledRadioGroup>
      </StyledFormControl>
      <StyledFormControl>
        <StyledFormLabel id="darkmode-radio-button-group">Enable dark mode</StyledFormLabel>
        <StyledRadioGroup
          value={colorTheme}
          onChange={onColorThemeChange}
        >
        <StyledFormControlLabel value='light' control={<StyledRadio />} label="Light mode" />
        <StyledFormControlLabel value='dark' control={<StyledRadio />} label="Dark mode" />
        </StyledRadioGroup>
      </StyledFormControl>
    </StyledGeneralOptionContainer>
  )
}

export const StyledGeneralOptionContainer = styled('div')`
  display: flex;
  flex-direction: column;
`

export const StyledPanelHeaderTypography = styled(Typography)`
  color: ${(props) => props.theme.palette.text.primary};
  font-size: ${(props) => props.theme.typography.pxToRem(28)};
  font-weight: 600;
`
