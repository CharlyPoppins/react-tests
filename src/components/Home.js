import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import { navigate } from '@reach/router'

import Cookie from 'components/Cookie'
import Notifications from 'components/Notifications'
import PwaActions from 'components/PwaActions'

import { version } from '../../package.json'

import { isStandalone } from '../helpers'

const test = async () => {
  console.log('PWA is installed', isStandalone())

  if ('getInstalledRelatedApps' in navigator) {
    const relatedApps = await navigator.getInstalledRelatedApps()
    console.log('navigator.getInstalledRelatedApps', relatedApps)
  } else {
    console.warn('navigator.getInstalledRelatedApps is not available')
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('install', (event) => {
      console.log('addEventListener install', event)
    })

    navigator.serviceWorker.addEventListener('activate', (event) => {
      console.log('addEventListener activate', event)
    })

    navigator.serviceWorker.addEventListener('fetch', (event) => {
      console.log('addEventListener fetch', event)
    })

    navigator.serviceWorker.addEventListener('message', (event) => {
      console.log('addEventListener message', event)
    })

    navigator.serviceWorker.onmessage = (event) => {
      console.log('navigator receive message from SW', event)
    }
  } else {
    console.warn('Service workers are not supported.')
  }
}
const Home = () => {
  const [currentServiceWorker, setCurrentServiceWorker] = useState(null)

  const waitForServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.ready
      setCurrentServiceWorker(registration)
    } else {
      console.warn('Service workers are not supported.')
    }
  }

  useEffect(() => {
    waitForServiceWorker()
    test()
  }, [])

  console.log('currentServiceWorker', currentServiceWorker)
  return (
    <div>
      <p className="my-1 text-center">Device tests</p>

      <p className="my-3">
        <Button
          className="btn-block btn-secondary"
          onClick={() => navigate(`/qr-code-scanner`)}
        >
          QR Code scanner
        </Button>
      </p>

      <p className="my-3">
        <Button
          className="btn-block btn-secondary"
          onClick={() => navigate(`/device-identification`)}
        >
          Device identification
        </Button>
      </p>

      <p className="my-3">
        <Button
          className="btn-block btn-secondary"
          onClick={() => navigate(`/vibration`)}
        >
          Vibration
        </Button>
      </p>

      <p className="my-1 text-center">PWA testing</p>

      <PwaActions />

      <Notifications currentServiceWorker={currentServiceWorker} />

      <p className="my-1 text-center">Cookie testing</p>

      <Cookie />

      <p className="my-3">{`Version : ${version}`}</p>
    </div>
  )
}

export default Home
