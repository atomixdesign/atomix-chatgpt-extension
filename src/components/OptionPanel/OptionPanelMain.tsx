import { styled } from "@mui/material";
import React from 'react';
import { OptionPanelContext } from "./OptionPanelContext";

export type OptionPanelMainProps = {
  children: React.ReactNode
  idx: number
}

export const OptionPanelMain: React.FC<OptionPanelMainProps> = ({ children, idx, ...props }) => {
  const { activePanel } = React.useContext(OptionPanelContext)


  return (
    <StyledOptionMainContainer $active={idx === activePanel}>
      {children}
    </StyledOptionMainContainer>
  )
}

export const StyledOptionMainContainer = styled('div', { shouldForwardProp: (prop) => prop !== '$active' }) <{ $active?: boolean }>`
  display: ${(props) => props.$active ? 'block' : 'none'};
  padding: ${(props) => props.theme.typography.pxToRem(20)};
`
