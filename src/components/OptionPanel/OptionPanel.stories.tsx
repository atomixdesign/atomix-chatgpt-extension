import { Container, Grid } from '@mui/material'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { OptionPanelList } from './OptionPanelList'
import { OptionPanelListItem } from './OptionPanelListItem'
import { OptionPanelMain } from './OptionPanelMain'
import { OptionPanelWrapper } from './OptionPanelWrapper'

export default {
  title: 'Option Panel',
  component: OptionPanelWrapper,
  args: {
  },
  argTypes: {
  },
} as Meta<any>

export const Default: Story<any> = () => {
  return (
    <Container maxWidth="lg">
      <OptionPanelWrapper>
        <Grid container >
          <Grid item xs={12} md={4}>
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
            <OptionPanelMain idx={0}>
              This is the General Option Panel
            </OptionPanelMain>
            <OptionPanelMain idx={1}>
              This is the Upcoming Releases Panel
            </OptionPanelMain>
            <OptionPanelMain idx={2}>
              This is the Contact Us Panel
            </OptionPanelMain>
          </Grid>
        </Grid>
      </OptionPanelWrapper>
    </Container>
  )
}
