import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { StylesProvider, jssPreset } from '@mui/styles';
import { create } from 'jss';
import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { Sidebar } from '../../../components/Sidebar/Sidebar';
import { ToggleColorMode } from '../../../components/ToggleColorMode/ToggleColorMode';
import { SidebarSettingsProvider } from '../../../settings/sidebar';

export class SidebarComponent extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    const emotionRoot = document.createElement('style');
    const mountPoint = document.createElement('div');
    shadowRoot.appendChild(emotionRoot);
    const reactRoot = shadowRoot.appendChild(mountPoint);

    const jss = create({
      ...jssPreset(),
      insertionPoint: reactRoot,
    });

    const cache = createCache({
      key: 'atomix-sidebar-css',
      prepend: true,
      container: emotionRoot,
    });

    const root = ReactDOMClient.createRoot(mountPoint);

    root.render(
      <StylesProvider jss={jss}>
        <CacheProvider value={cache}>
          <SidebarSettingsProvider>
            <ToggleColorMode>
              <Sidebar />
            </ToggleColorMode>
          </SidebarSettingsProvider>
        </CacheProvider>
      </StylesProvider>
    );
  }
}
