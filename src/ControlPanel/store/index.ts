import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const altKeyStatus = atomWithStorage<boolean>("fikma_alt_status", false)

export const metaKeyStatus = atomWithStorage<boolean>(
  "fikma_meta_status",
  false
)
