import { Outlet } from 'react-router-dom'
import clsx from 'clsx'
import { FC } from 'react'
import { useUIStore } from '@/stores/ui.store'
import { NavigationBar } from '@/components/navigation/NavigationBar'
import { TeleportSlot } from '@/components/utilitary/TeleportSlot'
import { useDeviceInfoStore } from '@/config/context/deviceInfo.store'

const isIos = useDeviceInfoStore.getState().deviceInfo?.platform === 'ios'

export const BaseLayout: FC = () => {
  const { title, subtitle } = useUIStore(store => store.page)
  return (
    <div
      data-test='default-layout'
      className='relative flex fullscreen flex-col items-center'
    >
      <div
        className={clsx(
          'fixed z-top top-0 flex w-full items-end bg-zinc-800 shadow sm:mx-auto',
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
          'flex w-full grow flex-1 flex-col items-center',
          isIos ? 'mts-0.5 pbs-2' : 'mt-16 pb-14',
        )}
      >
        <Outlet />
      </main>
      <NavigationBar />
    </div>
  )
}
