import { ButtonBase, Typography, styled } from '@mui/material';
import React, { ComponentProps } from 'react';

export type ButtonProps = Omit<ComponentProps<typeof ButtonBase>, 'disableRipple'> & {
  children: React.ReactNode
  fontColor?: 'light' | 'dark'
}

export const Button: React.FC<ButtonProps> = ({children, fontColor='dark', ...props}) => {
  
  return (
    <StyledButton disableRipple $fontColor={fontColor} {...props}>
      <StyledTypography variant='body2' $fontColor={fontColor}>
        {children}
      </StyledTypography>
    </StyledButton>
  )
}

export const StyledButton = styled(ButtonBase, { shouldForwardProp: (prop) => prop !== '$fontColor' })<{$fontColor: 'light' | 'dark'}>`
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: ${props => props.$fontColor === 'light' ? props.theme.palette.custom.buttonLight : props.theme.palette.custom.buttonDark};
    z-index: 2;
    opacity: 0;
    border-radius: ${props => props.theme.typography.pxToRem(20)};
    transition: top 0.2s ease, bottom 0.2s ease, left 0.2s ease, right 0.2s ease, opacity 0.2s ease;
  }

  &:hover:after {
    opacity: 1;
    left: ${props => props.theme.typography.pxToRem(-14)};
    right: ${props => props.theme.typography.pxToRem(-14)};
    bottom: ${props => props.theme.typography.pxToRem(-8)};
    top: ${props => props.theme.typography.pxToRem(-8)};
  }

  &:active:after {
    left: ${props => props.theme.typography.pxToRem(-12)};
    right: ${props => props.theme.typography.pxToRem(-12)};
    bottom: ${props => props.theme.typography.pxToRem(-6)};
    top: ${props => props.theme.typography.pxToRem(-6)};
  }
`

export const StyledTypography = styled(Typography, { shouldForwardProp: (prop) => prop !== '$fontColor' })<{$fontColor: 'light' | 'dark'}>`
  position: relative;
  font-size: ${props => props.theme.typography.pxToRem(16)};
  color: ${props => props.$fontColor === 'light' ? props.theme.palette.text.primary : props.theme.palette.text.secondary};
  z-index: 3;
`
