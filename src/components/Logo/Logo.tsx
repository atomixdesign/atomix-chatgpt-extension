import { styled } from '@mui/material'
import React from 'react'
import { ENV } from '../../lib/consts'

export type LogoProps = {
  height?: number
}

export const Logo: React.FC<LogoProps> = ({ height=24 }) => {

  return (
    <AtomixLogo $height={height} src={ENV === 'production' ? chrome.runtime.getURL('logo.svg') : 'logo.svg'} />
  )
}

export const AtomixLogo = styled('img', {shouldForwardProp: (prop) => prop !== '$height'})<{$height?: number}>`
  height: ${props => props.theme.typography.pxToRem(props.$height || 24)};
`