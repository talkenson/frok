import { useState } from 'react'
import { Button } from '@/ui/Button'
import { ReactComponent as Mascot } from '@/assets/mascot.svg'
import { useDeviceInfoStore } from '@/config/context/deviceInfo.store'

export const Home = () => {
  const [count, setCount] = useState(0)
  const platform = useDeviceInfoStore(store => store.deviceInfo?.platform)

  return (
    <div className='fullscreen border-2 border-red-400 flex flex-col'>
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
  )
}
