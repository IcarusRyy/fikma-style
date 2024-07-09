import {
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  useCopyToClipboard,
  useEventListener,
} from '~ControlPanel/hooks';

const ContentComp = ({ minimized = false }) => {
  const [text, setText] = useState<string>()
  const [num, setNum] = useState<number>(0)
  const [_, copy] = useCopyToClipboard()
  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        window.fikma_figma && console.log("copy")
        window.fikma_figma?.notify("Copied to clipboard")
      })
      .catch(() => {
        window.fikma_figma?.notify("Failed to copy!", {
          error: true
        })
      })
  }
  const handleSelect = useCallback(async () => {
    const node = window.fikma_figma?.currentPage?.selection?.[0] ?? null
    console.log(node, "node")
    setText((node?.characters || node?.name) ?? "")
    console.log(typeof node?.getCssAsync, "typeof ")
    if ("getCssAsync" in node) {
      console.log(123)
    }
    const cssData = (await node?.getCSSAsync?.()) ?? null
    if (!cssData) return
    console.log(cssData, "cssData")
  }, [])
  useEventListener({
    eventName: "click",
    key: "#fullscreen-root canvas",
    cb: handleSelect,
    deps: [handleSelect]
  })
  return (
    <div className="plasmo-relative">
      <div className="plasmo-flex plasmo-px-4 plasmo-py-2 plasmo-items-center plasmo-border-b  plasmo-border-solid plasmo-font-600 plasmo-text-[13px] plasmo-sticky plasmo-top-[45px]   plasmo-z-2">
        <span
          className="plasmo-p-1 plasmo-hover:bg-#e5e5e5/50 plasmo-rounded-sm plasmo-cursor-pointer plasmo-truncate"
          onClick={handleCopy(text)}>
          {text}
        </span>
      </div>
      <div>
        <div>{num}</div>
        <button onClick={() => setNum(num + 1)}>+1</button>
      </div>
    </div>
  )
}

export default memo(ContentComp)
