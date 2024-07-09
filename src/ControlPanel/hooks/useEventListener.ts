import { useEffect } from 'react';

interface useEventListenerPropsType {
  eventName: string
  key: string
  cb: (e: any) => void
  deps: any[]
}

export const useEventListener = ({
  eventName,
  key,
  cb,
  deps = []
}: useEventListenerPropsType) => {
  useEffect(() => {
    const dom = document.querySelector(key)
    dom?.addEventListener(eventName, cb)
    return () => {
      dom?.removeEventListener(eventName, cb)
    }
  }, deps)
}
