import { Typography } from '@mui/material';
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
    <>
      <Typography variant="body1">
        After installation, refresh the page if the sidebar is not showing.
      </Typography>
    </>
  )
}
