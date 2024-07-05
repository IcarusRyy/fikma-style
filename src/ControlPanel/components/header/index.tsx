import {
  type ForwardedRef,
  forwardRef,
  memo,
  type MouseEvent,
} from 'react';

import { useAtom } from 'jotai';
import {
  useKeyPressHandlers,
  useMouseHandlers,
} from '~ControlPanel/hooks';
import {
  altKeyStatus,
  metaKeyStatus,
} from '~ControlPanel/store';

import {
  ArrowsAltOutlined,
  ShrinkOutlined,
} from '@ant-design/icons';

interface Props {
  onMouseDown: (e: any) => void
  onMouseUp: (e: MouseEvent) => void
  minimized: boolean
  onToggleSize: () => void
}

const Header = forwardRef(function (
  { onMouseDown, onMouseUp, minimized, onToggleSize }: Props,
  ref: ForwardedRef<HTMLElement>
) {
  const [altStatus] = useAtom(altKeyStatus)
  const [metaStatus] = useAtom(metaKeyStatus)

  useKeyPressHandlers(altStatus, metaStatus)
  const { onMouseEnter, onMouseLeave } = useMouseHandlers(metaStatus)
  return (
    <header
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      ref={ref}
      className={` plasmo-border-[1px] plasmo-gap-2  plasmo-border-[red] plasmo-flex plasmo-items-center plasmo-justify-center plasmo-cursor-grab plasmo-active:cursor-grabbing plasmo-select-none`}>
      <img
        src={"https://d4ewq8axz3ayo.cloudfront.net/global/favicon.png"}
        className="plasmo-w-[18px] plasmo-h-[18px] plasmo-rounded plasmo-cursor-pointer"
      />
      <span className="plasmo-flex-1 plasmo-font-700 plasmo-text-sm">
        Fikma Style
      </span>
      <div
        className="plasmo-p-.5 plasmo-flex-center plasmo-rounded plasmo-bg-#eee"
        onMouseDown={(e) => {
          e.stopPropagation()
        }}>
        <span className=" plasmo-cursor-pointer" onClick={onToggleSize}>
          {minimized ? (
            <ArrowsAltOutlined className="plasmo-text-[16px]" />
          ) : (
            <ShrinkOutlined className="plasmo-text-[16px]" />
          )}
        </span>
      </div>
    </header>
  )
})

export default memo(Header)
