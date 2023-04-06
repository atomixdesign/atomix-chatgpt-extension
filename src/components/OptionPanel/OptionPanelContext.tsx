import React from "react";

export type OptionPanelContextType = {
  activePanel: number
  setActivePanel: (panelIndex: number) => void
}

export const OptionPanelContext = React.createContext<OptionPanelContextType>({
  activePanel: 0,
  setActivePanel: () => {}
})
