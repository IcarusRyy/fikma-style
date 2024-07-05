import type { FC } from 'react';

import cssText from 'data-text:~style.css';
import type {
  PlasmoCSConfig,
  PlasmoCSUIJSXContainer,
  PlasmoCSUIProps,
  PlasmoRender,
} from 'plasmo';
import { createRoot } from 'react-dom/client';
import ControlPanel from '~ControlPanel';

export const config: PlasmoCSConfig = {
  matches: [
    "https://figma.com/file/*",
    "https://www.figma.com/file/*",
    "https://www.figma.com/design/*"
  ],
  run_at: "document_end"
}
export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const getRootContainer = () =>
  new Promise((resolve) => {
    const checkInterval = setInterval(() => {
      const rootContainerParent = document.querySelector(`body`)
      if (rootContainerParent) {
        clearInterval(checkInterval)
        const rootContainer = document.createElement("div")
        rootContainerParent.appendChild(rootContainer)
        resolve(rootContainer)
      }
    }, 150)
  })

const PlasmoOverlay: FC<PlasmoCSUIProps> = () => {
  return <ControlPanel />
}
// 插入样式到文档的 head 中
const insertStyle = () => {
  const style = getStyle()
  document.head.appendChild(style)
}
export const render: PlasmoRender<PlasmoCSUIJSXContainer> = async ({
  createRootContainer
}) => {
  const rootContainer = await createRootContainer()
  insertStyle()
  const root = createRoot(rootContainer)
  root.render(<PlasmoOverlay />)
}

// 确保在文档加载完成后插入样式
// if (document.readyState === "complete") {
//   insertStyle()
// } else {
//   window.addEventListener("load", insertStyle)
// }

export default PlasmoOverlay
