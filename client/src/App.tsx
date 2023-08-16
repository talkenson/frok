import { SplashScreen } from '@capacitor/splash-screen'
import { useMount, useOnceEffect } from '@reactuses/core'
import { router } from '@/router'
import { RouterProvider } from 'react-router-dom'
import { usePeerStore } from '@/stores/peer.store'
import { useEffect, useState } from 'react'
import { useUserStore } from '@/stores/user.store'
import Peer from 'peerjs'
import { PeerContext } from '@/config/context/peer.context'

function App() {
  useMount(() => {
    SplashScreen.hide()
  })

  const peerId = usePeerStore(store => store.peerId)

  const [peer] = useState<Peer>(
    new Peer(peerId, {
      host: 'peerjs.x.talkiiing.ru',
      secure: true,
    }),
  )

  return (
    <div className='fullscreen relative layout'>
      <PeerContext.Provider value={peer}>
        <RouterProvider router={router} future={{ v7_startTransition: true }} />
      </PeerContext.Provider>
    </div>
  )
}

export default App
