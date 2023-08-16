import { ReactComponent as Mascot } from '@/assets/mascot.svg'

export const SplashScreen = () => {
  return (
    <div className='fullscreen flex flex-col justify-center items-center'>
      <Mascot className='h-12' />
    </div>
  )
}
