import { BreakpointMap, RemScalingOptions } from '@atomixdesign/rem-scaling';
import { InlineFontSetter, RemScalingProvider } from '@atomixdesign/rem-scaling-react';
import { ThemeProvider as MuiThemeProvider, Theme, createTheme, useTheme } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { ColorModeContext, getDesignTokens } from '../../styles/theme';

export type ToggleColorModeProps = {
  children: React.ReactNode;
};

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
  const [mode, setMode] = useState<'light' | 'dark'>('light')
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    [],
  )
  const theme: Theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode])

  const themeBreakpoints = useThemeBreakpoints()

  const remScaling: RemScalingOptions = {
    min: 14,
    max: theme.typography.fontSize,
    base: theme.typography.fontSize,
    breakpoints: themeBreakpoints,
    fallback: [0, 1600],
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>
        {/* @ts-ignore */}
        <RemScalingProvider options={remScaling}>
          <InlineFontSetter />
          {children}
        </RemScalingProvider>
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  )
}
