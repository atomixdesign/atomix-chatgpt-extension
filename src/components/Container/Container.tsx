import { styled } from '@mui/material';
import React, { ComponentProps } from 'react';

export type ContainerProps = ComponentProps<typeof StyledContainer> & {
  children: React.ReactNode
}

export const Container: React.FC<ContainerProps> = ({children, ...props}) => {
  
  return (
    <StyledContainer {...props}>
      {children}
    </StyledContainer>
  )
}

export const StyledContainer = styled('div')`
  padding-left: ${props => props.theme.typography.pxToRem(20)};
  padding-right: ${props => props.theme.typography.pxToRem(20)};
  max-width: calc(100% - ${props => props.theme.typography.pxToRem(40)});
`
