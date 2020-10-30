import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'

const InstallButton = () => {
  const [supportsPWA, setSupportsPWA] = useState(false)
  const [promptInstall, setPromptInstall] = useState(null)

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      setSupportsPWA(true)
      setPromptInstall(e)
    }
    window.addEventListener('beforeinstallprompt', handler)

    return () => window.removeEventListener('transitionend', handler)
  }, [])

  console.log('supportsPWA', supportsPWA)
  return (
    <Button
      className="btn-block btn-secondary"
      onClick={() => {
        if (promptInstall) {
          promptInstall.prompt()
        }
      }}
      disabled={!supportsPWA}
    >
      {supportsPWA ? 'Install PWA' : 'Device does not support PWA install'}
    </Button>
  )
}

export default InstallButton
