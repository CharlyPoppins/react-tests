import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import reportWebVitals from './reportWebVitals'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)

serviceWorkerRegistration.register()
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorker.register({
//   onUpdate: (registration) => {
//     console.log('onUpdate', registration)
//     const event = new CustomEvent('onNewServiceWorker', {
//       detail: { registration },
//     })
//     document.dispatchEvent(event)
//   },
//   onSuccess: (registration) => {
//     console.log('onSuccess', registration)
//   },
//   onOffline: () => {
//     console.log('App is offline')
//   },
//   onOnline: () => {
//     console.log('App is online')
//   },
// })

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
