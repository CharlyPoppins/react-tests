import React, { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import QrReader from 'react-qr-reader'
import { navigate } from '@reach/router'

const QrCodeScanner = () => {
  const [error, setError] = useState(null)
  const [scanned, setScanned] = useState(null)

  return (
    <div>
      <Button className="btn-secondary" onClick={() => navigate(-1)}>
        back
      </Button>
      <div className="my-5 text-center">Qr Code Scanner</div>
      {error && (
        <Alert variant="danger">
          <Alert.Heading>{error.name}</Alert.Heading>
          {error.message}
        </Alert>
      )}
      <div className="my-5">
        {scanned ? (
          <>
            <p
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              Redirect to link <strong>{scanned}</strong> ?
            </p>
            <Button
              className="btn-block btn-secondary"
              onClick={() => navigate(scanned)}
            >
              YES
            </Button>

            <Button
              className="btn-block btn-secondary"
              onClick={() => {
                setScanned(null)
              }}
            >
              NO
            </Button>
          </>
        ) : (
          <QrReader
            delay={300}
            onError={(e) => {
              console.error(e)
              setError(e)
            }}
            onScan={(data) => {
              if (data) {
                setScanned(data)
              }
            }}
            style={{ margin: 'auto', width: '300px' }}
          />
        )}
      </div>
    </div>
  )
}

export default QrCodeScanner
