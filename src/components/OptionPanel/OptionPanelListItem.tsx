import { ListItem, Typography, styled } from "@mui/material";
import React from 'react';
import { OptionPanelContext } from "./OptionPanelContext";

export type OptionPanelListProps = {
  children: React.ReactNode
  idx: number
}

export const OptionPanelListItem: React.FC<OptionPanelListProps> = ({ children, idx, ...props }) => {
  const { activePanel, setActivePanel } = React.useContext(OptionPanelContext)

  const onPanelListItemClick = () => {
    setActivePanel(idx)
  }

  return (
    <StyledOptionListItem onClick={onPanelListItemClick} $active={idx === activePanel}>
      <StyledListItemTypography variant='body1'>
        {children}
      </StyledListItemTypography>
    </StyledOptionListItem>
  )
}

export const StyledOptionListItem = styled(ListItem, { shouldForwardProp: (prop) => prop !== '$active' })<{ $active?: boolean }>`
  padding: ${(props) => props.theme.typography.pxToRem(20)} ${(props) => props.theme.typography.pxToRem(20)};
  cursor: pointer;
  background-color: ${(props) => props.$active ? props.theme.palette.custom.option : 'transparent'};
  
  &:hover {
    background-color: ${(props) => props.theme.palette.custom.option}
  }
`

export const StyledListItemTypography = styled(Typography)`
  font-size: ${(props) => props.theme.typography.pxToRem(18)};
  font-weight: 400;
  color: ${(props) => props.theme.palette.text.primary};
`