import { Typography } from '@mui/material';
import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../assets/fonts/stylesheet.css';
import { ToggleColorMode } from '../../components/ToggleColorMode/ToggleColorMode';

const container = document.getElementById('app-container');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <ToggleColorMode>
      <Typography>This is a test typography</Typography>
  </ToggleColorMode>
);
