import { Teleport } from '@/components/utilitary/Teleport'
import { useParams } from 'react-router-dom'
import photo from '@/assets/images/fallback/chat-icon.png'

export const Chat = () => {
  let { userId } = useParams()

  return (
    <>
      <div className='fullscreen border-2 border-black flex flex-col'>
        <Teleport to='layout-actions-left'>Back</Teleport>
        <Teleport to='layout-actions-right'>
          <img src={photo} className='w-10 h-10 rounded-full' />
        </Teleport>
        <div className='w-full flex space-x-3 items-center justify-center py-2'>
          <h1 className='text-mantis-300'>Chat {userId}</h1>
        </div>
      </div>
    </>
  )
}
