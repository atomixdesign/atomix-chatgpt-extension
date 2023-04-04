import { Box } from '@mui/material'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { Logo } from './Logo'

export default {
  title: 'Logo',
  component: Logo,
  args: {
    height: 24
  },
  argTypes: {
    height: {
      name: 'height',
      defaultValue: 24,
      control: {
        type: 'number',
      }
    },
  },
} as Meta<any>

export const Default: Story<any> = ({ height}) => {
  return (
    <Box sx={{backgroundColor: 'black'}}>
      <Logo height={height}/>
    </Box>
  )
}
