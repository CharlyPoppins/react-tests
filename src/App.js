import React from 'react'
import { ToastContainer } from 'react-toastify'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'

import MainRouter from 'containers/MainRouter'

const App = () => {
  return (
    <>
      <MainRouter />
      <ToastContainer />
    </>
  )
}

export default App
