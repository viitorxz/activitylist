import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ActivityProvider } from './contexts/ActivityContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ActivityProvider>
      <App />
    </ActivityProvider>
  </React.StrictMode>,
)
