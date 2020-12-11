import React from 'react'
import Button from 'react-bootstrap/Button'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types'

import { urlBase64ToUint8Array } from '../helpers/webPush'

const Notifications = ({ currentServiceWorker }) => {
  const notificationsEnabled =
    currentServiceWorker && Notification.permission === 'granted'

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
            if (currentServiceWorker) {
              currentServiceWorker.showNotification(
                `This is a text notification ${Math.random(100)}`,
              )
            } else {
              console.warn('No Service worker provided.')
            }
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
              const subscribeOptions = {
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(
                  process.env.REACT_APP_PUBLIC_VAPID_KEY,
                ),
              }

              const subscription = await currentServiceWorker.pushManager.subscribe(
                subscribeOptions,
              )

              console.log('subscription', subscription)
              console.log('subscription JSON', subscription.toJSON())

              const { keys } = subscription.toJSON()

              console.log('keys', keys)
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
