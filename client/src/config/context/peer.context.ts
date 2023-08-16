import { createContext } from 'react'
import Peer from 'peerjs'

export const PeerContext = createContext<Peer | undefined>(undefined)
