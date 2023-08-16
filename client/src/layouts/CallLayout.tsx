import { Outlet } from 'react-router-dom'
import clsx from 'clsx'
import { FC } from 'react'
import { useUIStore } from '@/stores/ui.store'
import { NavigationBar } from '@/components/navigation/NavigationBar'
import { TeleportSlot } from '@/components/utilitary/TeleportSlot'
import { useDeviceInfoStore } from '@/config/context/deviceInfo.store'

const isIos = useDeviceInfoStore.getState().deviceInfo?.platform === 'ios'

export const CallLayout: FC = () => {
  const { title, subtitle } = useUIStore(store => store.page)
  return (
    <div
      data-test='default-layout'
      className='relative flex fullscreen flex-col items-center'
    >
      <div className='absolute top-0 fullscreen left-0 pt-8'>
        <TeleportSlot
          name='layout-call-background'
          className='fullscreen relative fade-y-[4rem]'
        />
      </div>
      <div
        className={clsx(
          'fixed z-top top-0 flex w-full items-end',
          isIos && 'heightstop-12 pts-0',
        )}
      >
        <div className='flex w-full items-center justify-between h-16 py-2 px-5'>
          <TeleportSlot name='layout-actions-left' />
          <div className='flex w-full select-none flex-col space-y-0 items-center sm:items-start'>
            <span className='text-lg font-semibold'>{title || 'Frok'}</span>
            {subtitle ? (
              <span className='text text-xs text-secondary-text'>
                {subtitle || ''}
              </span>
            ) : null}
          </div>

          <TeleportSlot name='layout-actions-right' />
        </div>
      </div>
      <main
        className={clsx(
          'relative flex w-full grow flex-1 flex-col items-center',
          isIos ? 'mts-0.5 pbs-2' : 'mt-16 pb-14',
        )}
      >
        <Outlet />
      </main>
      <div
        className={clsx(
          'fixed bottom-0 z-10 w-full select-none bg-zinc-800',
          isIos && 'heightsbottom-10 pbs-[-1rem]',
        )}
      >
        <div className='w-full h-full flex flex-row items-center space-x-2 sm:mx-auto justify-between px-2'>
          <TeleportSlot name='layout-call-bottom' />
        </div>
      </div>
    </div>
  )
}
