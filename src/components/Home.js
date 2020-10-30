import React from 'react'
import Button from 'react-bootstrap/Button'
import { navigate } from '@reach/router'

const Home = () => {
  return (
    <div>
      <p className="my-5 text-center">This is a test app</p>

      <p className="my-3">
        <Button
          className="btn-block btn-secondary"
          onClick={() => navigate(`/qr-code-scanner`)}
        >
          QR Code scanner
        </Button>
      </p>
    </div>
  )
}

export default Home
