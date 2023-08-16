import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import Peer from 'peerjs'
import { customAlphabet } from 'nanoid'
const nanoPeerId = customAlphabet(
  '1234567890abcdefhijklmnopqrstuvwxyzQWERTYUIOPASDFGHJKLZXCVBNM',
  32,
)

type UIStore = {
  peerId: string
}

export const usePeerStore = create<UIStore>()(
  devtools(
    persist(
      (set, get) => ({
        peerId: nanoPeerId(),
      }),
      {
        name: 'peer-config-store',
      },
    ),
  ),
)
