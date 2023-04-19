import { List, ListItem, Typography, styled } from "@mui/material"
import React from "react"

export type ReleaseProps = {
  //
}

export const Release: React.FC<ReleaseProps> = (props) => {

  return (
    <div>
      <StyledPanelHeaderTypography variant="h1">
        Releases
      </StyledPanelHeaderTypography>
      <StyledVersionTypography>
        Version 1.0.1
      </StyledVersionTypography>
      <StyledFunctionalityList>
        <StyledFunctionalityListItem>
          <StyledListItemTypography>
            Resolve minor bugs
          </StyledListItemTypography>
        </StyledFunctionalityListItem>
      </StyledFunctionalityList>
      <StyledVersionTypography>
        Version 1.0.0
      </StyledVersionTypography>
      <StyledFunctionalityList>
        <StyledFunctionalityListItem>
          <StyledListItemTypography>
            Support GPT3.5 and GPT4 models
          </StyledListItemTypography>
        </StyledFunctionalityListItem>
        <StyledFunctionalityListItem>
          <StyledListItemTypography>
            Support keyboard short keys and customizations
          </StyledListItemTypography>
        </StyledFunctionalityListItem>
        <StyledFunctionalityListItem>
          <StyledListItemTypography>
            Support light/dark mode
          </StyledListItemTypography>
        </StyledFunctionalityListItem>
        <StyledFunctionalityListItem>
          <StyledListItemTypography>
            Add Atomix ChatGPT Sidebar
          </StyledListItemTypography>
        </StyledFunctionalityListItem>
      </StyledFunctionalityList>
    </div>
  )
}

export const StyledPanelHeaderTypography = styled(Typography)`
  color: ${(props) => props.theme.palette.text.primary};
  font-size: ${(props) => props.theme.typography.pxToRem(28)};
  margin-bottom: ${(props) => props.theme.typography.pxToRem(40)};
  font-weight: 600;
`

export const StyledVersionTypography = styled(Typography)`
  color: ${(props) => props.theme.palette.text.primary};
  font-size: ${(props) => props.theme.typography.pxToRem(18)};
  font-weight: 600;
`

export const StyledFunctionalityList = styled(List)`
  color: ${(props) => props.theme.palette.text.primary};
  font-size: ${(props) => props.theme.typography.pxToRem(16)};
  font-weight: 400;
  margin-left: ${(props) => props.theme.typography.pxToRem(16)};
  list-style-type: disc;
  pl: 2;
`

export const StyledFunctionalityListItem = styled(ListItem)`
  display: list-item;
  padding-left: 0;
`

export const StyledPanelContainer = styled('div')`

`

export const StyledListItemTypography = styled(Typography)`
  color: ${(props) => props.theme.palette.text.primary};
  font-size: ${(props) => props.theme.typography.pxToRem(16)};
  font-weight: 400;
`