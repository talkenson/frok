import { useCallback, useDebugValue, useEffect, useRef, useState } from 'react'
import { stopMediaStream } from '@/hooks/aux/stopMediaStream'

const useUserMedia = (constraints: MediaStreamConstraints) => {
  const stream = useRef<MediaStream>(null)
  const [error, setError] = useState()
  const [state, setState] = useState<'pending' | 'resolved' | 'rejected'>(
    'pending',
  )

  useDebugValue({ error, state, stream })

  useEffect(() => {
    if (!stream.current) return
    const trackAdded = () => setState('resolved')

    stream.current?.addEventListener('addtrack', trackAdded)
    return () => {
      stream.current?.removeEventListener('addtrack', trackAdded)
      setState('pending')
    }
  }, [stream])

  const getUserMedia = useCallback(
    async (cancelled: boolean) => {
      if (
        !navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia ||
        !stream
      ) {
        console.error('no navigator, or stream corrupted')
        return
      }
      try {
        const newStream = await navigator.mediaDevices.getUserMedia(constraints)
        console.log(stream)
        if (!cancelled) {
          //@ts-ignore
          stream.current = newStream
        }
      } catch (err) {
        if (!cancelled) {
          setError(err as any)
        }
      }
    },
    [constraints, stream],
  )

  useEffect(() => {
    if (stream.current) {
      console.log('stream exists', $line)
      return
    }
    let cancelled = false

    const cancel = () => {
      cancelled = true
      console.log('cancelling')
      if (!stream) return

      if ((stream.current as MediaStream).getVideoTracks) {
        ;(stream.current as MediaStream)
          .getVideoTracks()
          .map(track => track.stop())
      }

      if ((stream.current as MediaStream).getAudioTracks) {
        ;(stream.current as MediaStream)
          .getAudioTracks()
          .map(track => track.stop())
      }
    }

    getUserMedia(cancelled)

    return cancel
  }, [getUserMedia, stream])

  return { error, state, stream }
}

export default useUserMedia
export { useUserMedia }
