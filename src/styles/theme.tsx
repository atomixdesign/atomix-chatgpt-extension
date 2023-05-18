import { createTheme, PaletteMode } from '@mui/material'
import React from 'react'

// Typography constants
const fontSize = 16
const htmlFontSize = 13
export const pxToRem = (size: number, coef = fontSize / 14) => `${size}px`

const lightTheme = {
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
    paper: '#fff',
  },
  divider: '#D3D3D3',
  custom: {
    blue: '#2BBBE9',
    darkBlue: '#0F1822',
    openai: '#10A37F',
    gpt4: '#ab68ff',
    inputField: '#fff',
    outline: '#B9B9B9',
    avatar: '#0F1822',
    buttonLight: 'rgba(43, 187, 233, 0.2)',
    buttonDark: 'rgba(255, 255, 255, 0.25)',
    option: 'rgba(0, 0, 0, 0.05)',
    error: '#B72A2A',
  },
  text: {
    primary: '#000',
    secondary: '#fff',
    disabled: '#6A6A6A',
  },
}

const darkTheme = {
  primary: {
    main: '#2BBBE9',
  },
  secondary: {
    main: '#23589F',
  },
  common: {
    white: '#F5F5F5',
  },
  background: {
    default: '#1E1E1E',
    paper: '#252526',
  },
  divider: '#737373',
  custom: {
    blue: '#2BBBE9',
    darkBlue: '#000000',
    openai: '#10A37F',
    gpt4: '#ab68ff',
    inputField: '#343434',
    outline: '#B9B9B9',
    avatar: '#606060',
    buttonLight: 'rgba(255, 255, 255, 0.25)',
    buttonDark: 'rgba(255, 255, 255, 0.25)',
    option: 'rgba(255, 255, 255, 0.25)',
    error: '#FF7B7B',
  },
  text: {
    primary: '#F5F5F5',
    secondary: '#F5F5F5',
    disabled: '#C2C2C2',
  },
}

export const getDesignTokens = (mode: PaletteMode) => ({
  typography: {
    fontFamily: [
      'Quicksand',
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
      fontFamily: ['Quicksand', 'sans-serif'].join(','),
      fontSize: pxToRem(24),
      fontWeight: 700,
    },
    body1: {
      fontFamily: ['Quicksand', 'sans-serif'].join(','),
      fontSize: pxToRem(16),
      fontWeight: 400,
    },
    body2: {
      fontFamily: ['Quicksand', 'sans-serif'].join(','),
      fontSize: pxToRem(16),
      fontWeight: 500,
    },
  },
  palette: {
    mode,
    ...(mode === 'light' ? lightTheme : darkTheme),
  },
})

export const theme = createTheme(getDesignTokens('light'))

export const ColorModeContext = React.createContext({ toggleColorMode: () => { } })

export type ThemeType = typeof theme;
