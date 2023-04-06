import { Box, Container, Grid, styled } from '@mui/material';
import React from 'react';
import { Logo } from '../../components/Logo/Logo';
import { OptionPanelList } from '../../components/OptionPanel/OptionPanelList';
import { OptionPanelListItem } from '../../components/OptionPanel/OptionPanelListItem';
import { OptionPanelMain } from '../../components/OptionPanel/OptionPanelMain';
import { OptionPanelWrapper } from '../../components/OptionPanel/OptionPanelWrapper';
import { ContactUs } from './modules/ContactUs/ContactUs';
import { GeneralOption } from './modules/GeneralOption/GeneralOption';
import { UpcomingRelease } from './modules/UpcomingRelease/UpcomingRelease';

export type OptionsProps = {
  //
}

export const Options: React.FC<OptionsProps> = (props) => {
  return (
    <div {...props}>
      <StyledHeader>
        <Container maxWidth="xl">
          <Logo />
        </Container>
      </StyledHeader>
      <StyledBody>
        <Container maxWidth="lg">
          <OptionPanelWrapper>
            <Grid container >
              <Grid item xs={12} md={4}>
                <Box sx={{ marginTop: '40px' }} />
                <OptionPanelList>
                  <OptionPanelListItem idx={0}>
                    General
                  </OptionPanelListItem>
                  <OptionPanelListItem idx={1}>
                    Upcoming releases
                  </OptionPanelListItem>
                  <OptionPanelListItem idx={2}>
                    Contact us
                  </OptionPanelListItem>
                </OptionPanelList>
              </Grid>
              <Grid item xs={12} md={8}>
                <StyledPanelContainer>
                  <OptionPanelMain idx={0}>
                    <GeneralOption />
                  </OptionPanelMain>
                  <OptionPanelMain idx={1}>
                    <UpcomingRelease />
                  </OptionPanelMain>
                  <OptionPanelMain idx={2}>
                    <ContactUs />
                  </OptionPanelMain>
                </StyledPanelContainer>
              </Grid>
            </Grid>
          </OptionPanelWrapper>
        </Container>
      </StyledBody>
    </div>
  )
};

export const StyledHeader = styled('header')`
  display: flex;
  align-items: center;
  height: ${(props) => props.theme.typography.pxToRem(80)};
  background-color: ${(props) => props.theme.palette.custom.darkBlue};
`

export const StyledBody = styled('div')`
  background-color: ${(props) => props.theme.palette.background.default};
  min-height: 100vh;
`

export const StyledPanelContainer = styled('div')`
  margin-top: ${(props) => props.theme.typography.pxToRem(40)};
  margin-left: ${(props) => props.theme.typography.pxToRem(50)};
  border-radius: ${(props) => props.theme.typography.pxToRem(20)};
  border: 1px solid ${(props) => props.theme.palette.custom.outline};
`