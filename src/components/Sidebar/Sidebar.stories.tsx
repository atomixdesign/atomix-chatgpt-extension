import { Box } from '@mui/material'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { Sidebar } from './Sidebar'

export default {
  title: 'Sidebar',
  component: Sidebar,
  args: {
  },
  argTypes: {
  },
} as Meta<any>

export const Default: Story<any> = () => {
  return (
    <>
      <Box sx={{height: '250vh'}} />
      <Sidebar />
    </>
  )
}
