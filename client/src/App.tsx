import { useEffect, useState } from 'react'
import { Button } from '@/ui/Button'
import { ReactComponent as Mascot } from '@/assets/mascot.svg'
import { useDeviceInfoStore } from '@/config/context/deviceInfo.store'
import { SplashScreen } from '@capacitor/splash-screen'
import { useMount } from '@reactuses/core'

function App() {
  const [count, setCount] = useState(0)
  const platform = useDeviceInfoStore(store => store.deviceInfo?.platform)

  useMount(() => {
    SplashScreen.hide()
  })

  return (
    <div className='fullscreen layout'>
      <div className='fullscreen border-2 border-accent flex flex-col'>
        <div className='w-full flex space-x-3 items-center justify-center py-2'>
          <Mascot className='h-16' />
          <h1 className='text-mantis-300'>Frok ({platform})</h1>
        </div>
        <div className='card'>
          <Button
            className='btn w-40 btn-accent'
            onClick={() => setCount(count => count + 1)}
          >
            count is {count}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default App
