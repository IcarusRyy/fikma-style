import React, { useRef } from 'react';

import Content from './components/content';
import Header from './components/header';
import {
  useDraggable,
  usePanelState,
} from './hooks';

const ControlPanel = () => {
  const headerRef = useRef<HTMLElement | null>(null)
  const initialPosition = JSON.parse(localStorage.getItem("position") || "null") || [window.innerWidth - 505, 72]

  const { position, handleDragStart, handleDragEnd } = useDraggable(initialPosition)
  const { minimized, toggleMinimize } = usePanelState(false)

  return (
    <div
      className={`plasmo-fixed plasmo-text-[red] plasmo-h-[100px] plasmo-rounded plasmo-border-solid plasmo-border-1 plasmo-border-[#333AAA]  plasmo-bg-[#FFF]`}
      style={{
        left: position[0],
        top: position[1]
      }}
      tabIndex={-1}>
      <Header
        ref={headerRef}
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        minimized={minimized}
        onToggleSize={toggleMinimize}
      />
      <Content minimized={minimized} />
    </div>
  )
}

export default ControlPanel
