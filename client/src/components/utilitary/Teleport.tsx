import {
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { TeleportSlotName } from '@/@types/teleport'

export const Teleport: FC<PropsWithChildren<{ to: TeleportSlotName }>> = ({
  to,
  children,
}) => {
  const [container, setContainer] = useState<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    const element = document.getElementById(to) as HTMLDivElement | null
    if (element) {
      setContainer(element)
    } else {
      console.error("[Teleport]: Element isn't available")
    }
  }, [to])

  return container ? createPortal(children, container, to) : null
}
