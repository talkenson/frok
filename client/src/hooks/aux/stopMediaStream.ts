function stopAndRemoveTrack(mediaStream: MediaStream) {
  return function (track: MediaStreamTrack) {
    track.stop()
    mediaStream.removeTrack(track)
  }
}

function stopMediaStream(mediaStream?: MediaStream) {
  if (!mediaStream) {
    return
  }

  mediaStream.getTracks().forEach(stopAndRemoveTrack(mediaStream))
}

export { stopMediaStream }
