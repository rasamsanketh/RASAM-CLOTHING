import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster 
      position="top-right" 
      toastOptions={{
        style: {
          background: '#0B0B0C',
          color: '#F4F1EC',
          border: '1px solid rgba(244, 241, 236, 0.12)',
        },
      }}
    />
  </StrictMode>,
)
