import { useEffect, useState } from 'react'

export function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    let exitTimer: number | undefined
    let finished = false
    let timeout: number | undefined
    const finish = () => {
      if (finished) return
      finished = true
      if (timeout) window.clearTimeout(timeout)
      setLeaving(true)
      exitTimer = window.setTimeout(() => setVisible(false), 650)
    }
    timeout = window.setTimeout(finish, 1800)
    if (document.readyState === 'complete') {
      if (timeout) window.clearTimeout(timeout)
      finish()
    } else {
      window.addEventListener('load', finish, { once: true })
    }
    return () => {
      window.clearTimeout(timeout)
      if (exitTimer) window.clearTimeout(exitTimer)
      window.removeEventListener('load', finish)
    }
  }, [])

  if (!visible) return null
  return (
    <div className={`loading-screen${leaving ? ' is-leaving' : ''}`} role="status" aria-label="Cargando MBU">
      <div className="loader-ring"><span>MBU<span className="brand-dot">.</span></span></div>
      <span className="loader-caption">SOFTWARE / IDEAS / FUTURO</span>
    </div>
  )
}
