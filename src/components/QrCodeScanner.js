import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import QrReader from 'react-qr-reader'
import { navigate } from '@reach/router'

const QrCodeScanner = () => {
  const [scanned, setScanned] = useState(null)

  return (
    <div>
      <Button className="btn-secondary" onClick={() => navigate(-1)}>
        back
      </Button>
      <div className="my-5 text-center">Qr Code Scanner</div>
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
            onError={(error) => {
              alert.error(error)
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
