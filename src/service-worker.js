/* eslint-disable */

self.addEventListener('message', (event) => {
  console.log('SW message', event)
  if (event.data && event.data.type === 'MESSAGE_IDENTIFIER') {
    console.log('SW message is MESSAGE_IDENTIFIER')
  }
  // Force SW upgrade (activation of new installed SW version)
  if (event.data === 'skipWaiting') {
    self.skipWaiting()
  }
})

self.addEventListener('install', (event) => {
  console.log('SW install')
})

self.addEventListener('activate', (event) => {
  console.log('SW activate')
})

self.addEventListener('fetch', (event) => {
  console.log('SW fetch', event)
  event.waitUntil(
    (async function () {
      // Exit early if we don't have access to the client.
      // Eg, if it's cross-origin.
      if (!event.clientId) return

      // Get the client.
      const client = await clients.get(event.clientId)
      // Exit early if we don't get the client.
      // Eg, if it closed.
      if (!client) return

      // Send a message to the client.
      client.postMessage({
        msg: 'Hey I just got a fetch from you!',
      })
    })(),
  )
})

export function register(config) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href)
    if (publicUrl.origin !== window.location.origin) {
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebook/create-react-app/issues/2374
      return
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`
      registerValidSW(swUrl, config)
    })
  }

  window.addEventListener('appinstalled', (evt) => {
    console.log('SW appinstalled event', evt)
  })
}

function registerValidSW(swUrl, config) {
  console.log('SW registerValidSW', swUrl, config)
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      registration.onupdatefound = () => {
        console.log('onupdatefound')
        const installingWorker = registration.installing
        if (installingWorker == null) {
          return
        }
        registration.installing.postMessage('Hello, i am installing.')
        installingWorker.onstatechange = () => {
          console.log('registration.installing', installingWorker)
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // At this point, the updated precached content has been fetched,
              // but the previous service worker will still serve the older
              // content until all client tabs are closed.
              console.log(
                'New content is available and will be used when all ' +
                  'tabs for this page are closed. See https://cra.link/PWA.',
              )

              // Execute callback
              if (config && config.onUpdate) {
                config.onUpdate(registration)
              }
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              console.log('SW Content is cached for offline use.')

              // Execute callback
              if (config && config.onSuccess) {
                config.onSuccess(registration)
              }
            }
          }
        }
      }
    })
    .catch((error) => {
      console.error('SW Error during service worker registration:', error)
    })
}
