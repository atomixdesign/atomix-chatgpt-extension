import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../assets/fonts/fonts.css';
import { ToggleColorMode } from '../../components/ToggleColorMode/ToggleColorMode';
import { ENV } from '../../lib/consts';
import { SidebarSettingsProvider } from '../../settings/sidebar';
import { Options } from './Options';
import './index.css';

const container = document.getElementById('app-container');
const root = createRoot(container!);

root.render(
  <SidebarSettingsProvider>
    <ToggleColorMode>
      <link rel="stylesheet" type="text/css" href={ENV === 'production' ? chrome.runtime.getURL("fonts.css") : 'fonts/fonts.css'} />
      <Options />
    </ToggleColorMode>
  </SidebarSettingsProvider>
);
