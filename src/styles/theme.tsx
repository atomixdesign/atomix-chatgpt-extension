import { createTheme, PaletteMode } from '@mui/material'
import React from 'react'

// Typography constants
const fontSize = 16
const htmlFontSize = 16
export const pxToRem = (size: number, coef = fontSize / 14) => `${size / htmlFontSize}rem`

const lightTheme = {
  // palette values for light mode
  primary: {
    main: '#2BBBE9',
  },
  secondary: {
    main: '#23589F',
  },
  common: {
    white: '#fff',
  },
  background: {
    default: '#fff',
  },
  divider: '#DADADA',
  custom: {
    brandpink: '#FFD8CF',
    lightpink: '#FFEDED',
    black: '#07070A',
    accentyellow: '#FCEDC7',
    green: '#24682C',
    yellow: '#D4921F',
    lightpurple: '#EBE0F6',
    lightgreen: '#D2EAD5',
    lightblue: '#D0E9FF',
    pink: '#EFC7C7',
  },
  text: {
    primary: '#2BBBE9',
    secondary: '#707070',
    disabled: '#8E8E93',
  },
}

const darktheme = {
  primary: {
    main: '#101822',
  },
  divider: '#fff',
  background: {
    default: '#101822'
  },
  text: {
    primary: '#fff',
    secondary:'#fff',
  },
}

export const getDesignTokens = (mode: PaletteMode) => ({
  typography: {
    fontFamily: [
      'Quicksand',
      'HKNova',
      'NanumPen',
      '"Helvetica Neue"',
      'Helvetica',
      '"Segoe UI"',
      'Arial',
      'sans-serif',
    ].join(','),
    fontSize,
    htmlFontSize,
    pxToRem: (size: number) => pxToRem(size),
    spacing: (factor: number) => pxToRem(factor * 10),
    h1: {
      fontFamily: ['HKNova', 'sans-serif'].join(','),
      fontSize: pxToRem(32),
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    body1: {
      fontFamily: ['Quicksand', 'sans-serif'].join(','),
      fontSize: pxToRem(16),
      fontWeight: 400,
    },
    body2: {
      fontFamily: ['HKNova', 'sans-serif'].join(','),
      fontSize: pxToRem(16),
      fontWeight: 400,
    },
  },
  palette: {
    mode,
    ...(mode === 'light' ? lightTheme : darktheme),
  },
})

export const theme = createTheme(getDesignTokens('light'))

export const ColorModeContext = React.createContext({ toggleColorMode: () => { } })

export type ThemeType = typeof theme;
