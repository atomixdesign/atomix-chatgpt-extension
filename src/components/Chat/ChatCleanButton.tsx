import { ButtonBase, Grid, Typography, styled } from '@mui/material';
import React, { ComponentProps } from 'react';

export type ChatCleanButtonProps = ComponentProps<typeof ButtonBase> & {
  children: React.ReactNode
  icon: React.ReactNode
}

export const ChatCleanButton: React.FC<ChatCleanButtonProps> = ({ icon, children, ...props }) => {

  return (
    <StyledChatCleanButton {...props}>
      <Grid container direction={"row"} justifyContent={"flex-start"} alignItems={"center"}>
        <StyledIconGrid item>
          {icon}
        </StyledIconGrid>
        <Grid item>
          <Typography variant="body2">
            {children}
          </Typography>
        </Grid>
      </Grid>
    </StyledChatCleanButton>
  )
}

export const StyledIconGrid = styled(Grid)`
  margin-right: ${props => props.theme.typography.pxToRem(8)};
  font-size: ${props => props.theme.typography.pxToRem(16)};
  max-height: ${props => props.theme.typography.pxToRem(16)};
`

export const StyledChatCleanButton = styled(ButtonBase)`
  color: ${props => props.theme.palette.text.primary};
  background-color: ${props => props.theme.palette.custom.inputField};
  padding: ${props => props.theme.typography.pxToRem(10)} ${props => props.theme.typography.pxToRem(12)};
  border-radius: ${props => props.theme.typography.pxToRem(8)};
  border: 1px solid ${props => props.theme.palette.divider};
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.12);
`
