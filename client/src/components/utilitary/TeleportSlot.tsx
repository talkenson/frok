import { FC } from 'react'
import { TeleportSlotName } from '@/@types/teleport'

export const TeleportSlot: FC<{
  name: TeleportSlotName
  className?: string
}> = ({ name, className }) => {
  return (
    <div
      id={name}
      className={`shrink-0 ${className || ''}`}
      role='teleport-slot'
    />
  )
}
