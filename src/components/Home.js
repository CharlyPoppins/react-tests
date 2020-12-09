import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import { navigate } from '@reach/router'

import Cookie from 'components/Cookie'
import InstallButton from 'components/InstallButton'

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
    const registration = await navigator.serviceWorker.ready
    console.log('navigator.serviceWorker.ready', registration)

    navigator.serviceWorker.addEventListener('install', (event) => {
      console.log('addEventListener install', event)
    })

    navigator.serviceWorker.addEventListener('activate', (event) => {
      console.log('addEventListener activate', event)
    })

    navigator.serviceWorker.addEventListener('fetch', (event) => {
      console.log('addEventListener fetch', event)
    })

    navigator.serviceWorker.onmessage = (event) => {
      console.log('navigator receive message from SW', event)
    }
  } else {
    console.warn('navigator.serviceWorker is not available')
  }
}

const notificationsEnabled = Notification.permission === 'granted'

const Home = () => {
  useEffect(() => {
    test()
  }, [])

  return (
    <div>
      <p className="my-5 text-center">This is a test app</p>

      <p className="my-3">
        <InstallButton />
      </p>

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

      <p className="my-3">
        <Button
          className="btn-block btn-secondary"
          onClick={() => {
            navigator.serviceWorker.controller.postMessage({
              type: 'MESSAGE_IDENTIFIER',
            })
          }}
        >
          Post message to SW
        </Button>
      </p>

      <p className="my-3">
        <Button
          className="btn-block btn-secondary"
          onClick={async () => {
            if ((await Notification.requestPermission()) === 'denied') {
              // eslint-disable-next-line no-alert
              alert(
                'Notifications blocked. Please enable them in your browser.',
              )
            }
          }}
          disable={notificationsEnabled}
        >
          {notificationsEnabled
            ? 'Notifications are enabled'
            : 'Click to accept permission'}
        </Button>
      </p>

      <Cookie />

      <p className="my-3">{`Version : ${version}`}</p>
    </div>
  )
}

export default Home
