import { Typography, styled } from "@mui/material"
import React from "react"

export type ContactUsProps = {
  //
}

export const ContactUs: React.FC<ContactUsProps> = (props) => {

  return (
    <div>
      <StyledPanelHeaderTypography variant="h1">
        Contact us
      </StyledPanelHeaderTypography>

    </div>
  )
}

export const StyledPanelHeaderTypography = styled(Typography)`
  color: ${(props) => props.theme.palette.text.primary};
  font-size: ${(props) => props.theme.typography.pxToRem(28)};
  font-weight: 600;
`
