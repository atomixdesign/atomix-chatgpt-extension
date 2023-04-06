import { Button, Typography, styled } from "@mui/material"
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
      <StyledTypography>
        Whether you have a challenge or would like to bounce ideas off our team - please get in touch.
      </StyledTypography>
      <StyledCTA variant="contained" href={'https://www.atomix.com.au/get-in-touch'}>
        Contact us
      </StyledCTA>

    </div>
  )
}

export const StyledPanelHeaderTypography = styled(Typography)`
  color: ${(props) => props.theme.palette.text.primary};
  font-size: ${(props) => props.theme.typography.pxToRem(28)};
  font-weight: 600;
`

export const StyledTypography = styled(Typography)`
  color: ${(props) => props.theme.palette.text.primary};
  font-size: ${(props) => props.theme.typography.pxToRem(18)};
  font-weight: 600;
  margin-top: ${(props) => props.theme.typography.pxToRem(40)};
`

export const StyledCTA = styled(Button)`
  color: ${(props) => props.theme.palette.common.white};
  font-size: ${(props) => props.theme.typography.pxToRem(18)};
  font-weight: 500;
  margin-top: ${(props) => props.theme.typography.pxToRem(30)};
  box-shadow: none;
  text-transform: none;

  &:hover {
    color: ${(props) => props.theme.palette.common.white};
  }
`
