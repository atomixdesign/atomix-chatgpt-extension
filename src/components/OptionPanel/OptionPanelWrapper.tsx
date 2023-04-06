import React from "react"
import { OptionPanelContext } from "./OptionPanelContext"

export type OptionPanelWrapperProps = {
  children: React.ReactNode
}

export const OptionPanelWrapper: React.FC<OptionPanelWrapperProps> = ({ children, ...props }) => {
  const [activePanel, setActivePanel] = React.useState(0)

  React.useEffect(() => {
    // Get option value from ?option=1
    const urlParams = new URLSearchParams(window.location.search)
    const option = urlParams.get('option')

    if (option) {
      setActivePanel(parseInt(option))
    }
    else {
      setActivePanel(0)
    }
  }, [])

  return (
    <OptionPanelContext.Provider value={{ activePanel, setActivePanel }}>
      {children}
    </OptionPanelContext.Provider>
  )
}