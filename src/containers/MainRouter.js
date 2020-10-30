import React from 'react'
import { Router } from '@reach/router'

import Home from 'components/Home'
import QrCodeScanner from 'components/QrCodeScanner'

const MainRouter = () => {
  return (
    <div className="bg-light p-2" style={{ margin: 'auto', maxWidth: 500 }}>
      <Router>
        <Home path="" default />
        <QrCodeScanner path="/qr-code-scanner" />
      </Router>
    </div>
  )
}

export default MainRouter
