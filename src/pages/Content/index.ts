// eslint-disable-next-line
import { debounce } from 'lodash';
import '../../assets/fonts/fonts.css';
import { ENV } from '../../lib/consts';
import { SidebarComponent } from './modules/SidebarComponent';

if (ENV !== 'production') {
  console.log('Content script works!');
  console.log('Must reload extension for modifications to take effect.', document.getElementById('root'));
}

// Note: customElements required polyfill to work for chrome extensions. The vendors/webcomponents-bundle.js fix this issue.
if (customElements && !customElements.get('atomix-sidebar-component')) {
  customElements.define('atomix-sidebar-component', SidebarComponent);
}

// Only render after main website finishes loading
var obs = new MutationObserver(debounce(() => {
  
  // Fix issue where the atomix sidebar is overriding main page emotion 10 style
  // https://github.com/emotion-js/emotion/issues/2210
  const emotion10Styles = document.querySelectorAll(
    `style[data-emotion]:not([data-s])`
  );
  Array.prototype.forEach.call(emotion10Styles, (node) => {
    node.setAttribute("data-s", "");
  });

  // Render sidebar next to the body element
  if (!document.getElementById('atomixSidebar')) {
    const sidebar = document.createElement('atomix-sidebar-component');
    document.body.insertAdjacentElement("afterend", sidebar);
  }
  obs.disconnect();
}, 400));

obs.observe(document.body, { childList: true, subtree: true, attributes: false, characterData: false });

// Hide horizontal scroll bar
if (document.documentElement) {
  document.documentElement.style.overflowX = 'hidden';
}

// Render sidebar next to the body element
const sidebar = document.createElement('atomix-sidebar-component');
sidebar.setAttribute("id", "atomixSidebar");
document.body.insertAdjacentElement("afterend", sidebar);
