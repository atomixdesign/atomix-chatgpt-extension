import { Typography, styled } from "@mui/material"
import React from "react"

export type UpcomingReleaseProps = {
  //
}

export const UpcomingRelease: React.FC<UpcomingReleaseProps> = (props) => {

  return (
    <div>
      <StyledPanelHeaderTypography variant="h1">
        Upcoming releases
      </StyledPanelHeaderTypography>
    </div>
  )
}

export const StyledPanelHeaderTypography = styled(Typography)`
  color: ${(props) => props.theme.palette.text.primary};
  font-size: ${(props) => props.theme.typography.pxToRem(28)};
  font-weight: 600;
`

export const StyledVersionTypography = styled(Typography)`
  color: ${(props) => props.theme.palette.text.primary};
  font-size: ${(props) => props.theme.typography.pxToRem(18)};
  font-weight: 600;
`