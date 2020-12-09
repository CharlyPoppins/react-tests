import React from 'react'
import Button from 'react-bootstrap/Button'
import { toast } from 'react-toastify'

const Cookie = () => {
  return (
    <div className="my-3 row">
      <div className="col-4">
        <Button
          className="btn-block btn-secondary"
          onClick={async () => {
            const response = await fetch(
              `${process.env.REACT_APP_API_URL}/cookie`,
              { method: 'GET', credentials: 'include' },
            )
            if (response.ok) {
              const json = await response.json()
              toast(json.text)
            } else {
              toast.error('Response not OK')
            }
          }}
        >
          Get cookie if it exists
        </Button>
      </div>

      <div className="col-4">
        <Button
          className="btn-block btn-secondary"
          onClick={async () => {
            const response = await fetch(
              `${process.env.REACT_APP_API_URL}/cookie/create`,
              { method: 'GET', credentials: 'include' },
            )
            if (response.ok) {
              const json = await response.json()
              localStorage.setItem('xsrfToken', json.xsrfToken)
              toast(
                'A secure cookie has been created and xsrf token stored in local storage',
              )
            } else {
              toast.error('Response not OK')
            }
          }}
        >
          Create the first time
        </Button>
      </div>
      <div className="col-4">
        <Button
          className="btn-block btn-secondary"
          onClick={async () => {
            const response = await fetch(
              `${process.env.REACT_APP_API_URL}/cookie/read`,
              {
                method: 'GET',
                credentials: 'include',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'x-xsrf-token': localStorage.getItem('xsrfToken'),
                },
              },
            )
            if (response.ok) {
              const json = await response.json()
              if (json.status === 'OK') {
                toast.success('Your cookie and your xsrf token are matching')
              } else {
                toast.error('Your cookie and your xsrf token does not match')
              }
            } else {
              toast.error('Response not OK')
            }
          }}
        >
          Try to authenticate
        </Button>
      </div>
    </div>
  )
}

export default Cookie
