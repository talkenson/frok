import { useCallback, useEffect, useId, useRef, useState } from 'react'
import UAParser from 'ua-parser-js'

const ua = UAParser(navigator.userAgent)
const isCameraFlipped = ['mobile', 'tablet'].includes(ua.device.type || '')

export const useCamera = (constraints?: MediaStreamConstraints) => {
  const cameraId = useId()

  const container = useRef<HTMLDivElement>(null)
  const timerRef = useRef({ timer: 0 })
  const [sizes, setSizes] = useState({
    width: 100,
    height: 100,
  })
  const [loading, setLoading] = useState(false)

  const video = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<{ stream?: MediaStream }>({ stream: undefined })
  const [isUserFaced, setIsUserFaced] = useState(true)

  useEffect(() => {
    console.log('ratio updater effect')
    const updateRatio = () => {
      console.log('updating ratio')
      const constraints = {
        width: container.current?.clientWidth || 100,
        height: container.current?.clientHeight || 100,
      }
      const aspectRatio = isCameraFlipped
        ? constraints.height / constraints.width
        : constraints.width / constraints.height

      streamRef.current.stream?.getVideoTracks()[0].applyConstraints({
        aspectRatio: aspectRatio,
        frameRate: { ideal: 60, min: 15 },
      })
    }
    window.addEventListener('resize', updateRatio)

    return () => {
      window.removeEventListener('resize', updateRatio)
    }
  }, [container.current])

  const startCamera = useCallback(async () => {
    const videoCurrent = video.current
    console.log('start Camera', videoCurrent)

    if (
      videoCurrent &&
      navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia
    ) {
      setLoading(true)

      const constraints = {
        width: container.current?.clientWidth || 100,
        height: container.current?.clientHeight || 100,
      }
      setSizes(constraints)
      timerRef.current.timer = setTimeout(() => {
        ;(video => {
          console.log('vidcur', video.current)
          if (video.current) {
            navigator.mediaDevices
              .getUserMedia({
                audio: true,
                video: {
                  facingMode: 'user',
                },
              })
              .then(function (stream) {
                streamRef.current.stream = stream
                video.current!.srcObject = stream
                const isPlaying =
                  !video.current!.paused && !video.current!.ended

                const aspectRatio = isCameraFlipped
                  ? constraints.height / constraints.width
                  : constraints.width / constraints.height

                stream
                  .getVideoTracks()[0]
                  .applyConstraints({
                    aspectRatio: aspectRatio,
                  })
                  .then(r => {
                    if (!isPlaying) {
                      video
                        .current!.play()
                        .then(r => {
                          setLoading(false)
                          console.log('camera started')
                        })
                        .catch(e => console.warn(e))
                    }
                  })
              })
          }
        })(video)
      }, 2000)
    }
  }, [video, container])

  const stopCamera = () => {
    streamRef.current?.stream?.getTracks().forEach(function (track) {
      track.stop()
    })
    clearTimeout(timerRef.current.timer)
  }

  useEffect(() => {
    streamRef.current?.stream?.getVideoTracks()[0].applyConstraints({
      facingMode: isUserFaced ? 'user' : 'environment',
    })
  }, [isUserFaced, streamRef])

  const camera = useCallback(() => {
    return (
      <div ref={container} className='relative h-full w-full bg-zinc-700'>
        <video
          ref={video}
          id={`${cameraId}-video`}
          width={sizes.width}
          height={sizes.height}
          autoPlay={true}
          className='absolute h-full w-full bg-zinc-800'
          playsInline={true}
          muted={true}
        />
      </div>
    )
  }, [video, sizes, cameraId, container])

  return {
    video,
    startCamera,
    stopCamera,
    loading,
    setIsUserFaced,
    isUserFaced,
    stream: streamRef,
    CameraComponent: camera,
  }
}
