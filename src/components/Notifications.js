import React from 'react'
import Button from 'react-bootstrap/Button'
import { toast } from 'react-toastify'

const notificationsEnabled = Notification.permission === 'granted'

// Copied from the web-push documentation
const urlBase64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; i + 1) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

const Notifications = ({ currentServiceWorker }) => {
  return (
    <div className="my-3 row">
      <div className="col-6">
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
          disabled={notificationsEnabled}
        >
          {notificationsEnabled
            ? 'Notifications are enabled'
            : 'Click to accept notifications'}
        </Button>
      </div>
      <div className="col-6">
        <Button
          className="btn-block btn-secondary"
          onClick={() => {
            // eslint-disable-next-line no-unused-vars
            const n = new Notification(
              `This is a text notification ${Math.random(100)}`,
            )
          }}
          disabled={!notificationsEnabled}
        >
          Send notification
        </Button>
      </div>
      <div className="mt-3 col-12">
        <Button
          className="btn-block btn-secondary"
          onClick={async () => {
            if (currentServiceWorker) {
              const subscription = await currentServiceWorker.pushManager.subscribe(
                {
                  userVisibleOnly: true,
                  applicationServerKey: urlBase64ToUint8Array(
                    process.env.REACT_APP_PUBLIC_VAPID_KEY,
                  ),
                },
              )
              console.log('subscription', subscription)

              const response = await fetch(
                `${process.env.REACT_APP_API_URL}/web-push/register`,
                { method: 'POST' },
              )
              if (response.ok) {
                const json = await response.json()
                toast(json.text)
              } else {
                toast.error('Response not OK')
              }
            } else {
              console.warn('No Service worker provided.')
            }
          }}
        >
          Subscribe to push notification
        </Button>
      </div>
    </div>
  )
}

export default Notifications
