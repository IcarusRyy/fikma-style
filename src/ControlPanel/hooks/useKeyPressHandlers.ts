import { useEffect } from 'react';

import {
  toggleAltPress,
  toggleMetaPress,
} from '~ControlPanel/utils';

export const useKeyPressHandlers = (
  altStatus: boolean,
  metaStatus: boolean
) => {
  useEffect(() => {
    toggleAltPress(altStatus)
    toggleMetaPress(metaStatus)

    const canvas = document.querySelector("#fullscreen-root canvas")
    let isScrolling: any
    let isPressSpace: boolean = false

    const wheelHandler = () => {
      clearTimeout(isScrolling)
      toggleMetaPress(false)
      isScrolling = setTimeout(() => {
        if (!isPressSpace) {
          toggleMetaPress(metaStatus)
        }
      }, 300)
    }

    const spaceHandler = (e: KeyboardEvent) => {
      const { type, code } = e
      if (code === "Space") {
        if (type === "keyup") {
          isPressSpace = false
          toggleAltPress(altStatus)
          toggleMetaPress(metaStatus)
          return
        }
        if (type === "keydown" && !isPressSpace) {
          isPressSpace = true
          toggleAltPress(false)
          toggleMetaPress(false)
        }
      }
    }

    canvas?.addEventListener("wheel", wheelHandler, false)
    document.addEventListener("keydown", spaceHandler, false)
    document.addEventListener("keyup", spaceHandler, false)

    return () => {
      canvas?.removeEventListener("wheel", wheelHandler, false)
      document.removeEventListener("keydown", spaceHandler, false)
      document.removeEventListener("keyup", spaceHandler, false)
    }
  }, [altStatus, metaStatus])
}
