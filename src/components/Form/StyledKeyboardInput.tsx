import { Input, styled } from '@mui/material'

export const StyledKeyboardInput = styled(Input)`
  color: ${props => props.theme.palette.text.primary};
  margin-top: ${(props) => props.theme.typography.pxToRem(40)};
  border: 1px solid ${props => props.theme.palette.custom.outline};
  border-radius: ${props => props.theme.typography.pxToRem(8)};
  padding: ${props => props.theme.typography.pxToRem(4)};
  text-align: center;
  text-decoration: none;
  background-color: ${props => props.theme.palette.custom.inputField};
  max-width: ${props => props.theme.typography.pxToRem(140)};
  cursor: pointer;

  input {
    text-align: center;
    caret-color: transparent;
    cursor: pointer;
  }

  input:focus {
    color: ${props => props.theme.palette.primary.main};
  }
`
