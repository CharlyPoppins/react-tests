import React from 'react'
import Button from 'react-bootstrap/Button'
import { navigate } from '@reach/router'

const isVibrationEnabled = () => {
  if ('vibrate' in navigator) {
    return true
  }

  return false
}

const vibrate = (ms) => {
  if (isVibrationEnabled()) {
    navigator.vibrate(ms)
  }
}

const Vibration = () => {
  return (
    <div>
      <Button className="btn-secondary" onClick={() => navigate(-1)}>
        back
      </Button>
      <p className="my-5 text-center">
        {`Vibration is ${isVibrationEnabled() ? 'Enabled ' : 'Disabled'}`}
        <br />
        (but we can’t ensure device has a vibrator)
      </p>
      {isVibrationEnabled() && (
        <p className="my-3">
          <Button
            className="btn-block btn-secondary"
            onClick={() => vibrate(1000)}
          >
            Vibrate for 1 second
          </Button>
        </p>
      )}
    </div>
  )
}

export default Vibration
