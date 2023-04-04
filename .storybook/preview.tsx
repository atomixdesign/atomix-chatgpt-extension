import { Parameters } from "@storybook/react";
import React from "react";
import { ToggleColorMode } from "../src/components/ToggleColorMode/ToggleColorMode";

export const parameters: Parameters = {
  layout: "fullscreen",
  options: {
    storySort: {
      method: "alphabetical",
    },
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  a11y: {
    options: {
      runOnly: {
        type: "tag",
        values: ["wcag2aa"],
      },
    },
  },
};

export const decorators = [
  (Story) => (
    <ToggleColorMode>
      <link rel="stylesheet" href="fonts/storybook-fonts.css" />
      <Story />
    </ToggleColorMode>
  ),
];
