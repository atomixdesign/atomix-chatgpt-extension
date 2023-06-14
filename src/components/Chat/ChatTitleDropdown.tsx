import { faCaretDown } from '@fortawesome/pro-solid-svg-icons';
import { ClickAwayListener, MenuItem, MenuList, Popper, Typography, styled } from '@mui/material';
import React from 'react';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';

export type DropdownProps = {
  children: React.ReactNode
  name: string
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const Dropdown: React.FC<DropdownProps> = ({ children, name, open, setOpen, ...props }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: any) => {
    //onSelect(event)
    setOpen(false);
  };

  return (
    <StyledDropdownContainer>
      <Button onClick={handleClick} fontColor='light'>
        <StyledTitleContainer>
          <StyledChatTitle variant="h1">
            { name }
          </StyledChatTitle>
          <StyledIcon icon={faCaretDown}/>
        </StyledTitleContainer>
      </Button>
      <Popper
        sx={{ zIndex: 2 }}
        open={open}
        anchorEl={anchorEl}
        placement="bottom"
        disablePortal
      >
        <ClickAwayListener onClickAway={handleClose}>
          <StyledMenuList {...props}>
            {children}
          </StyledMenuList>
        </ClickAwayListener>
      </Popper>
    </StyledDropdownContainer>
  )
}

export type DropdownItemProps = {
  children: React.ReactNode
  onSelect: (event: any) => void
}


export const StyledDropdownContainer = styled('div')`
  margin-top: ${props => props.theme.typography.pxToRem(12)};
`

export const StyledIcon = styled(Icon)`
  color: ${props => props.theme.palette.text.primary};
  margin-left: ${props => props.theme.typography.pxToRem(8)};
  font-size: ${props => props.theme.typography.pxToRem(18)};
`

export const StyledTitleContainer = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const StyledChatTitle = styled(Typography)`
  color: ${props => props.theme.palette.text.primary};
  max-width: ${props => props.theme.typography.pxToRem(260)};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const StyledMenuList = styled(MenuList)`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.typography.pxToRem(16)};
  max-width: ${props => props.theme.typography.pxToRem(260)};
  padding: ${props => props.theme.typography.pxToRem(16)} ${props => props.theme.typography.pxToRem(20)};
  background-color: ${props => props.theme.palette.background.default};
  border-radius: ${props => props.theme.typography.pxToRem(8)};
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
`

export const StyledDropdownItem = styled(MenuItem)`
  padding: 0;
  margin: 0;
  max-width: ${props => props.theme.typography.pxToRem(260)};
  color: ${props => props.theme.palette.text.primary};

  &:hover {
    background-color: transparent;
  }

  &:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: ${props => props.theme.palette.custom.buttonLight};
    z-index: 100;
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
`

export const StyledDropdownItemTypography = styled(Typography)`
  color: ${props => props.theme.palette.text.primary};
  font-size: ${props => props.theme.typography.pxToRem(16)};
  font-weight: 500;
  color: ${props => props.theme.palette.text.primary};
  max-width: ${props => props.theme.typography.pxToRem(260)};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
