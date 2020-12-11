import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types'

import { urlBase64ToUint8Array } from '../helpers/webPush'

const isNotificationsSupported = () => {
  if ('Notification' in window) {
    return true
  }
  return false
}

const isNotificationsEnabled = () => {
  try {
    if (isNotificationsSupported()) {
      return Notification.permission === 'granted'
    }
    return false
  } catch (e) {
    console.error(e)
    return false
  }
}
const Notifications = ({ currentServiceWorker }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    isNotificationsEnabled(),
  )
  return (
    <div className="my-3 row">
      <div className="col-6">
        {isNotificationsSupported() ? (
          <Button
            className="btn-block btn-secondary"
            onClick={async () => {
              if ((await Notification.requestPermission()) === 'denied') {
                // eslint-disable-next-line no-alert
                alert(
                  'Notifications blocked. Please enable them in your browser.',
                )
              }
              setNotificationsEnabled(isNotificationsEnabled())
            }}
            disabled={notificationsEnabled}
          >
            {notificationsEnabled
              ? 'Notifications are enabled'
              : 'Click to accept notifications'}
          </Button>
        ) : (
          <Button
            className="btn-block btn-secondary"
            onClick={() => {}}
            disabled
          >
            Notifications are not supported
          </Button>
        )}
      </div>
      <div className="col-6">
        <Button
          className="btn-block btn-secondary"
          onClick={() => {
            if (currentServiceWorker) {
              currentServiceWorker.showNotification(
                `This is a text notification ${Math.random(100)}`,
              )
            } else {
              console.warn('No Service worker provided.')
            }
          }}
          disabled={
            !currentServiceWorker ||
            !isNotificationsSupported() ||
            !notificationsEnabled
          }
        >
          Send notification
        </Button>
      </div>
      <div className="mt-3 col-12">
        <Button
          className="btn-block btn-secondary"
          onClick={async () => {
            if (currentServiceWorker) {
              const subscribeOptions = {
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(
                  process.env.REACT_APP_PUBLIC_VAPID_KEY,
                ),
              }

              const subscription = await currentServiceWorker.pushManager.subscribe(
                subscribeOptions,
              )

              const { keys } = subscription.toJSON()

              console.log('endpoint', subscription.endpoint)
              console.log('auth', keys.auth)
              console.log('p256dh', keys.p256dh)

              const response = await fetch(
                `${process.env.REACT_APP_API_URL}/web-push/register`,
                {
                  method: 'POST',
                  body: JSON.stringify({
                    endpoint: subscription.endpoint,
                    keys,
                  }),
                },
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
          disabled={!currentServiceWorker}
        >
          Subscribe to push notification
        </Button>
      </div>
    </div>
  )
}

Notifications.propTypes = {
  currentServiceWorker: PropTypes.shape({
    pushManager: PropTypes.shape({
      subscribe: PropTypes.func,
    }),
    showNotification: PropTypes.func,
  }),
}

Notifications.defaultProps = {
  currentServiceWorker: null,
}

export default Notifications
