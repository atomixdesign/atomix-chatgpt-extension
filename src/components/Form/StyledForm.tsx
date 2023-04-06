import { FormControl, FormControlLabel, FormLabel, styled } from '@mui/material'

export const StyledFormControl = styled(FormControl)`
  margin-top: ${(props) => props.theme.typography.pxToRem(40)};
`

export const StyledFormLabel = styled(FormLabel)`
  color: ${(props) => props.theme.palette.text.primary};
  font-size: ${(props) => props.theme.typography.pxToRem(18)};
  margin-bottom: ${(props) => props.theme.typography.pxToRem(8)};
  font-weight: 500;

  &.Mui-focused {
    color: ${(props) => props.theme.palette.text.primary};
  }
`

export const StyledFormControlLabel = styled(FormControlLabel)`
  color: ${(props) => props.theme.palette.text.primary};
`