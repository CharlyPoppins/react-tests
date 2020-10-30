import React from 'react'
import { Router } from '@reach/router'

import Home from 'components/Home'
import QrCodeScanner from 'components/QrCodeScanner'
import DeviceIdentification from 'components/DeviceIdentification'

const MainRouter = () => {
  return (
    <div className="bg-light p-2" style={{ margin: 'auto', maxWidth: 500 }}>
      <Router>
        <Home path="" default />
        <QrCodeScanner path="/qr-code-scanner" />
        <DeviceIdentification path="/device-identification" />
      </Router>
    </div>
  )
}

export default MainRouter
