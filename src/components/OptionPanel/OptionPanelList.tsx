import { List, styled } from "@mui/material";
import React from 'react';

export type OptionPanelListProps = {
  children: React.ReactNode
}

export const OptionPanelList: React.FC<OptionPanelListProps> = ({ children, ...props }) => {

  return (
    <StyledOptionList>
      {children}
    </StyledOptionList>
  )
}

export const StyledOptionList = styled(List)`
  padding: 0;
  border: 1px solid ${(props) => props.theme.palette.custom.outline};
  border-radius: ${(props) => props.theme.typography.pxToRem(20)};

  li {
    border-top: 1px solid ${(props) => props.theme.palette.custom.outline};
  }

  li:first-of-type {
    border-top: none;
    border-radius: ${(props) => props.theme.typography.pxToRem(20)} ${(props) => props.theme.typography.pxToRem(20)} 0 0;
  }

  li:last-of-type {
    border-radius: 0 0 ${(props) => props.theme.typography.pxToRem(20)} ${(props) => props.theme.typography.pxToRem(20)};
  }
`
