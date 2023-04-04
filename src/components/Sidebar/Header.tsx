import { Grid, styled } from '@mui/material';
import React, { ComponentProps } from 'react';
import { MESSAGE_PASSING_OPEN_OPTION_PAGE } from '../../lib/consts';
import { Button } from '../Button/Button';
import { Container } from '../Container/Container';
import { Logo } from '../Logo/Logo';

export type HeaderProps = ComponentProps<typeof StyledHeader> & {
  onSidebarClose?: () => void
}

export const Header: React.FC<HeaderProps> = ({ children, onSidebarClose, ...props }) => {

  const onSettingsClick = () => {
    chrome.runtime.sendMessage({code: MESSAGE_PASSING_OPEN_OPTION_PAGE})
  }

  return (
    <StyledHeader {...props}>
      <Container>
        <StyledGrid container justifyContent={'space-between'} alignItems={'center'}>
          <Grid item>
            {/* <img src={chrome.runtime ? chrome.runtime.getURL('logo.svg') : 'logo.svg'} /> */}
            <Logo />
          </Grid>
          <Grid item>
            <StyledNavList>
              <StyledNavListItem>
                <Button fontColor='dark' onClick={onSettingsClick}>Settings</Button>
              </StyledNavListItem>
              <StyledNavListItem>
               <Button fontColor='dark' onClick={onSidebarClose}>Close</Button>
              </StyledNavListItem>
            </StyledNavList>
          </Grid>
        </StyledGrid>
      </Container>
    </StyledHeader>
  )
}

export const StyledGrid = styled(Grid)`
  height: ${props => props.theme.typography.pxToRem(80)};
`

export const StyledNavList = styled('ul')`
  display: flex;
  flex-direction: row;
  list-style: none;
  justify-content: space-between;
  gap: ${props => props.theme.typography.pxToRem(36)};
`

export const StyledNavListItem = styled('li')`
  
`

export const StyledHeader = styled('div')`
  position: relative;
  width: 100%;
  background-color: ${props => props.theme.palette.custom.darkBlue};
  border-radius: ${props => props.theme.typography.pxToRem(24)} 0 0 0;
  
  &:before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: ${props => props.theme.typography.pxToRem(-24)};
    height: ${props => props.theme.typography.pxToRem(24)};
    background-color: ${props => props.theme.palette.custom.darkBlue};
    z-index: -1;
  }
`
