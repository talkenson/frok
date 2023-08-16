import { Teleport } from '@/components/utilitary/Teleport'
import { useEffect, useState } from 'react'
import { useCamera } from '@/hooks/useCamera'
import { Button } from '@/ui/Button'

export const Call = () => {
  const { CameraComponent, startCamera, stopCamera, loading, setIsUserFaced } =
    useCamera()

  useEffect(() => {
    startCamera()
    return () => {
      stopCamera()
    }
  }, [])

  return (
    <>
      <div className='fullscreen flex flex-col' onClick={startCamera}>
        <Teleport to='layout-call-background'>
          <CameraComponent />
        </Teleport>
        <div className='fullscreen grow flex flex-col items-center justify-center'></div>
        <div className='w-full shrink-0 h-16 bg-white/30 flex flex-col items-center justify-center'>
          {loading ? (
            <p>Загрузка...</p>
          ) : (
            <Button onClick={() => setIsUserFaced(old => !old)}>Flip</Button>
          )}
        </div>
      </div>
    </>
  )
}
