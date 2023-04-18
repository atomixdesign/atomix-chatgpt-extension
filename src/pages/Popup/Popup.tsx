import { Box, Typography, styled } from '@mui/material';
import React from 'react';
import { MESSAGE_PASSING_TOGGLE_SIDEBAR } from '../../lib/consts';

export type PopupProps = {
  //
}

export const Popup: React.FC<PopupProps> = ({ ...props }) => {

  const toggleSidebar = async () => {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true })
    const tab = tabs[0]

    if (tab.id) {
      const response = await chrome.tabs.sendMessage(tab.id, { code: MESSAGE_PASSING_TOGGLE_SIDEBAR });
      if (response.success && window) window.close();
    }
  }

  toggleSidebar()

  return (
    <StyledBox>
      <Typography variant="body2">
        After completing the installation, please try refreshing the page if the sidebar doesn't appear. In case the sidebar still isn't visible, it could mean that the browser version or webpage is not compatible with the sidebar.
      </Typography>
    </StyledBox>
  )
}

export const StyledBox = styled(Box)`
  width: 260px;
`