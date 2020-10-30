import React from 'react'
import { Router } from '@reach/router'

import Home from 'components/Home'

const MainRouter = () => {
  return (
    <Router>
      <Home path="" default />
    </Router>
  )
}

export default MainRouter
