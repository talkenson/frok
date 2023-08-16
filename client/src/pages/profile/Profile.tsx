import { Teleport } from '@/components/utilitary/Teleport'
import { useParams } from 'react-router-dom'
import photo from '@/assets/images/fallback/chat-icon.png'
import { useUserStore } from '@/stores/user.store'
import { useControlled } from '@reactuses/core'
import { Button } from '@/ui/Button'

export const Profile = () => {
  const [nickname, setNickname] = useUserStore(store => [
    store.nick,
    store.setNick,
  ])

  const [value, setValue] = useControlled({ state: nickname })

  return (
    <>
      <div className='fullscreen border-2 border-black flex flex-col'>
        <Teleport to='layout-actions-left'>Back</Teleport>
        <Teleport to='layout-actions-right'>
          <img src={photo} className='w-10 h-10 rounded-full' />
        </Teleport>
        <div className='w-full flex flex-col space-y-3 items-center justify-center py-2'>
          <h1 className='text-mantis-300'>Hello, {nickname}!</h1>

          <input
            className='input'
            defaultValue={nickname}
            onInput={e => setValue(e.currentTarget.value)}
          />
          <Button onClick={() => setNickname(value)}>Update</Button>
        </div>
      </div>
    </>
  )
}
