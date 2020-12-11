import React from 'react'
import Button from 'react-bootstrap/Button'

import InstallButton from 'components/InstallButton'

const PwaActions = () => {
  return (
    <>
      <div className="my-3 row">
        <div className="col-6">
          <InstallButton />
        </div>
        <div className="col-4">
          <Button
            className="btn-block btn-secondary"
            onClick={() => {
              if ('serviceWorker' in navigator) {
                if (navigator.serviceWorker.controller) {
                  console.log('Sending message SKIP_WAITING to SW')
                  navigator.serviceWorker.controller.postMessage({
                    type: 'SKIP_WAITING',
                  })
                } else {
                  console.warn('Service workers controller does not exist.')
                }
              } else {
                console.warn('Service workers are not supported.')
              }
            }}
            disabled={
              !('serviceWorker' in navigator) ||
              !navigator.serviceWorker.controller
            }
          >
            Update PWA
          </Button>
        </div>
      </div>
      <div className="my-3 row">
        <div className="col-6">
          <Button
            className="btn-block btn-secondary"
            onClick={() => {
              if ('serviceWorker' in navigator) {
                if (navigator.serviceWorker.controller) {
                  console.log('Sending message MESSAGE_IDENTIFIER to SW')
                  navigator.serviceWorker.controller.postMessage({
                    type: 'MESSAGE_IDENTIFIER',
                  })
                } else {
                  console.warn('Service workers controller does not exist.')
                }
              } else {
                console.warn('Service workers are not supported.')
              }
            }}
            disabled={
              !('serviceWorker' in navigator) ||
              !navigator.serviceWorker.controller
            }
          >
            Post message to SW
          </Button>
        </div>
      </div>
    </>
  )
}

export default PwaActions
