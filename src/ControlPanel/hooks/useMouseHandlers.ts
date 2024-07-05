import { useCallback } from 'react';

import { toggleMetaPress } from '~ControlPanel/utils';

export const useMouseHandlers = (metaStatus: boolean) => {
  const onMouseEnter = useCallback(() => {
    toggleMetaPress(false)
  }, [])

  const onMouseLeave = useCallback(() => {
    toggleMetaPress(metaStatus)
  }, [metaStatus])

  return { onMouseEnter, onMouseLeave }
}
