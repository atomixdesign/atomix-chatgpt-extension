import { Container, Typography, styled } from '@mui/material';
import React from 'react';

export type OptionsProps = {
  //
}

export const Options: React.FC<OptionsProps> = (props) => {
  return (
    <StyledOptions {...props}>
      <StyledHeader>
        <Container>
          <Typography variant='h1'>This is the incomplete settings page.</Typography>
        </Container>
      </StyledHeader>
      <StyledBody>
        <Container>
          
        </Container>
      </StyledBody>
    </StyledOptions>
  )
};

export const StyledOptions = styled('div')`

`

export const StyledHeader = styled('header')`
  height: ${(props) => props.theme.typography.pxToRem(80)};
`

export const StyledBody = styled('div')`
`
