import { useState } from 'react';

export const usePanelState = (initialState: boolean) => {
  const [minimized, setMinimized] = useState(initialState)

  const toggleMinimize = () => {
    setMinimized((prev) => !prev)
  }

  return {
    minimized,
    toggleMinimize
  }
}
