import { useCallback, useEffect, useRef, useState } from 'react'

const FB_SDK_SRC = 'https://connect.facebook.net/en_US/sdk.js'
const FB_SDK_SCRIPT_ID = 'facebook-jssdk'

/**
 * Loads the Facebook JavaScript SDK once and reuses it on subsequent calls.
 * No App ID is required for the public Video Plugin, only xfbml: true.
 */
function loadFacebookSdk() {
  if (window.__fbSdkPromise) return window.__fbSdkPromise

  window.__fbSdkPromise = new Promise((resolve) => {
    if (window.FB) {
      resolve(window.FB)
      return
    }

    window.fbAsyncInit = function fbAsyncInit() {
      window.FB.init({ xfbml: false, version: 'v19.0' })
      resolve(window.FB)
    }

    if (document.getElementById(FB_SDK_SCRIPT_ID)) return

    const script = document.createElement('script')
    script.id = FB_SDK_SCRIPT_ID
    script.src = FB_SDK_SRC
    script.async = true
    script.defer = true
    script.crossOrigin = 'anonymous'
    document.body.appendChild(script)
  })

  return window.__fbSdkPromise
}

/**
 * Embeds a public Facebook video/reel using Facebook's Video Plugin and
 * exposes custom play/pause/mute controls driven by the plugin's JS SDK
 * player API (fired via the "xfbml.ready" event for type "video").
 *
 * Note: this only works for reels/videos that are public. Facebook's
 * plugin iframe is cross-origin, so control is only possible through
 * this official player-object API — there is no way to reach in and
 * control an FB iframe any other way.
 */
export default function FacebookReel({ href, className = '', width = 500 }) {
  const containerRef = useRef(null)
  const playerRef = useRef(null)
  const [ready, setReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    let cancelled = false
    setReady(false)
    playerRef.current = null

    loadFacebookSdk().then((FB) => {
      if (cancelled || !containerRef.current) return

      const subscription = (msg) => {
        if (msg.type !== 'video') return
        playerRef.current = msg
        setIsPlaying(!msg.isPaused())
        setIsMuted(msg.isMuted())
        setReady(true)
      }

      FB.Event.subscribe('xfbml.ready', subscription)
      FB.XFBML.parse(containerRef.current)

      // Cleanup subscription on unmount / href change
      return () => FB.Event.unsubscribe('xfbml.ready', subscription)
    })

    return () => {
      cancelled = true
    }
  }, [href])

  const togglePlay = useCallback(() => {
    const player = playerRef.current
    if (!player) return
    if (isPlaying) {
      player.pause()
      setIsPlaying(false)
    } else {
      player.play()
      setIsPlaying(true)
    }
  }, [isPlaying])

  const toggleMute = useCallback(() => {
    const player = playerRef.current
    if (!player) return
    if (isMuted) {
      player.unmute()
      setIsMuted(false)
    } else {
      player.mute()
      setIsMuted(true)
    }
  }, [isMuted])

  return (
    <div className={`relative overflow-hidden border border-ink-line bg-ink-soft ${className}`}>
      <div ref={containerRef}>
        <div
          className="fb-video"
          data-href={href}
          data-width={width}
          data-show-text="false"
          data-autoplay="false"
          data-allowfullscreen="true"
        />
      </div>

      {ready && (
        <div className="absolute bottom-3 left-3 flex gap-2">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause reel' : 'Play reel'}
            className="flex h-9 w-9 items-center justify-center border border-parchment/30 bg-ink/80 text-parchment transition hover:bg-ink"
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute reel' : 'Mute reel'}
            className="flex h-9 w-9 items-center justify-center border border-parchment/30 bg-ink/80 text-parchment transition hover:bg-ink"
          >
            {isMuted ? <MutedIcon /> : <UnmutedIcon />}
          </button>
        </div>
      )}
    </div>
  )
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
    </svg>
  )
}

function MutedIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.42.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 003.69-1.81L18.73 21 20 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
    </svg>
  )
}

function UnmutedIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
    </svg>
  )
}