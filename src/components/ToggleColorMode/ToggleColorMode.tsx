import { BreakpointMap, RemScalingOptions } from '@atomixdesign/rem-scaling';
import { RemScalingProvider } from '@atomixdesign/rem-scaling-react';
import { ThemeProvider as MuiThemeProvider, Theme, createTheme, useTheme } from '@mui/material';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { SidebarSettingsContext } from '../../settings/sidebar';
import { ColorModeContext, getDesignTokens } from '../../styles/theme';

export type ToggleColorModeProps = {
  children: React.ReactNode;
}

export const useThemeBreakpoints = (): BreakpointMap => {
  const theme = useTheme()
  const { keys } = theme.breakpoints
  const breakpoints = theme.breakpoints.values

  return keys.reduce((carry, key, i) => {
    if (i <= keys.length - 1) {
      // @ts-ignore
      const prevBreakpoint = breakpoints[keys[i - 1]]

      if (prevBreakpoint) {
        // eslint-disable-next-line no-param-reassign
        carry[key] = [prevBreakpoint, breakpoints[key] - 1]
      }
    }

    return carry
  }, {} as BreakpointMap)
}

export const ToggleColorMode: React.FC<ToggleColorModeProps> = ({ children }) => {
  const {loaded, loading, updateSettings, ...settings} = useContext(SidebarSettingsContext)
  const [mode, setMode] = useState<'light' | 'dark'>()
  const colorMode = useMemo(() => ({
    toggleColorMode: () => {
      updateSettings({
        isDarkMode: mode === 'light'
      })
    },
  }), [mode, updateSettings])

  useEffect(() => {
    // Initialize the color theme mode
    if (loaded) {
      setMode(settings.isDarkMode ? 'dark' : 'light')
    }
  }, [loaded, settings.isDarkMode])

  const theme: Theme = React.useMemo(() => createTheme(getDesignTokens(mode || 'light')), [mode])

  const themeBreakpoints = useThemeBreakpoints()

  const remScaling: RemScalingOptions = {
    min: 14,
    max: theme.typography.fontSize,
    base: theme.typography.fontSize,
    breakpoints: themeBreakpoints,
    fallback: [0, 1600],
  }

  return (
    <MuiThemeProvider theme={theme}>
      <ColorModeContext.Provider value={colorMode}>
        {/* @ts-ignore */}
        <RemScalingProvider options={remScaling}>
          {/* Need to fix Rem scaling and make the fontSize reponsive to shadow-root only*/}
          {/* <InlineFontSetter /> */}
          {children}
        </RemScalingProvider>
      </ColorModeContext.Provider>
    </MuiThemeProvider>
  )
}
