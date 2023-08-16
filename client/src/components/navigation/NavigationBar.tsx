import { ReactComponent as TruckIcon } from '@/assets/icons/primary/truck.svg'
import { PropsWithChildren } from 'react'
import clsx from 'clsx'
import { useNavigate, useLocation } from 'react-router-dom'
import ProfileIcon from '~icons/iconamoon/profile-circle-fill'
import MessageIcon from '~icons/iconamoon/comment-fill'
import { useUIStore } from '@/stores/ui.store'
import { useDeviceInfoStore } from '@/config/context/deviceInfo.store'

const isIos = useDeviceInfoStore.getState().deviceInfo?.platform === 'ios'

const NavigationItem = ({
  className,
  onClick,
  children,
  isActive,
  title,
  disabled,
}: PropsWithChildren<{
  className?: string
  onClick?: CallableFunction
  isActive?: boolean
  title?: string
  disabled?: boolean
}>) => {
  return (
    <div
      className={clsx(
        'group/item flex h-full w-full flex-col items-center justify-center cursor-pointer p-1 text-xs',
        isActive
          ? 'text-mantis-500 hover:text-mantis-400'
          : disabled
          ? 'pointer-events-none text-zinc-600'
          : 'text-zinc-400 hover:text-zinc-300',
        className,
      )}
      onClick={() => onClick?.()}
    >
      {children}
      {title ? <span>{title}</span> : null}
    </div>
  )
}

export const NavigationBar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeSection, setActiveSection] = useUIStore(store => [
    store.section.active,
    store.setActiveSection,
  ])

  return (
    <div
      className={clsx(
        'fixed bottom-0 z-10 w-full select-none bg-zinc-800',
        isIos && 'heightsbottom-10 pbs-[-1rem]',
      )}
    >
      <div className='w-full h-full flex flex-row items-center space-x-2 sm:mx-auto justify-between px-2'>
        <NavigationItem
          isActive={activeSection === 'contacts'}
          title={'Контакты'}
          onClick={() => navigate('/call')}
        >
          <ProfileIcon className='h-8 w-8 text-current' />
        </NavigationItem>
        <NavigationItem
          isActive={activeSection === 'messenger'}
          title={'Чаты'}
          onClick={() => navigate('/messenger')}
        >
          <MessageIcon className='h-8 w-8 text-current' />
        </NavigationItem>
        <NavigationItem
          title={'Настройки'}
          isActive={activeSection === 'profile'}
          onClick={() => navigate('/profile')}
        >
          <ProfileIcon className='h-8 w-8 text-current' />
        </NavigationItem>
      </div>
    </div>
  )
}
