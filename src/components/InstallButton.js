import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'

const InstallButton = () => {
  const [isInstalled, setInstalled] = useState(false)
  const [supportsPWA, setSupportsPWA] = useState(false)
  const [promptInstall, setPromptInstall] = useState(null)

  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setInstalled(true)
    }

    const handler = (e) => {
      e.preventDefault()
      setSupportsPWA(true)
      setPromptInstall(e)
    }
    window.addEventListener('beforeinstallprompt', handler)

    return () => window.removeEventListener('transitionend', handler)
  }, [])

  console.log('isInstalled', isInstalled)
  console.log('supportsPWA', supportsPWA)

  const getLabel = () => {
    if (isInstalled) {
      return 'App is already installed'
    }

    return supportsPWA ? 'Install PWA' : 'Device does not support PWA install'
  }

  return (
    <Button
      className="btn-block btn-secondary"
      onClick={() => {
        if (promptInstall) {
          promptInstall.prompt()
        }
      }}
      disabled={isInstalled || !supportsPWA}
    >
      {getLabel()}
    </Button>
  )
}

export default InstallButton
