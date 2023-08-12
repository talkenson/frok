import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import '@/assets/fonts/opensans/stylesheet.css'
import { ErrorBoundary } from '@/screens/ErrorBoundary'
import { useDeviceInfoStore } from '@/config/context/deviceInfo.store'
import { Device } from '@capacitor/device'

const initApp = async () => {
  if (true) {
    const eruda = await import('eruda')
    eruda.default.init()
  } else {
    console.log('Production Environment')
  }
  console.log(
    `%cFROK\nBuild: ${$buildTime} (${$buildMode})%c`,
    'font-weight: bold; color: #bada55; font-size: 26px;',
    'font-weight: normal; color: inherit; font-size: inherit;',
  )

  useDeviceInfoStore.getState().setDeviceInfo(await Device.getInfo())
}

initApp().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>,
  )
})
