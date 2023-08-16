import { useContext } from 'react'
import { PeerContext } from '@/config/context/peer.context'

export const usePeer = () => {
  const peer = useContext(PeerContext)
  if (!peer) {
    throw new Error('usePeer must be used within a PeerProvider')
  }
  return peer
}
