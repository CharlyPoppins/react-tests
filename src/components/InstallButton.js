import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'

import { isStandalone } from '../helpers'

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

  const isInstalled = isStandalone()

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
