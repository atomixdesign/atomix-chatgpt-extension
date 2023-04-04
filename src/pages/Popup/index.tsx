import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../assets/fonts/fonts.css';
import { ToggleColorMode } from '../../components/ToggleColorMode/ToggleColorMode';
import { Popup } from './Popup';

const container = document.getElementById('app-container');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
  <ToggleColorMode>
    <Popup />
  </ToggleColorMode>
);
