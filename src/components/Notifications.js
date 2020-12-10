import React from 'react'
import Button from 'react-bootstrap/Button'

const notificationsEnabled = Notification.permission === 'granted'

const Notifications = () => {
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
    </div>
  )
}

export default Notifications
