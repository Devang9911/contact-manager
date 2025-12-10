import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { AuthProvider } from './context/AuthContext.jsx'
import { PopupProvider } from './popup/PopupContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename='/ContactManager'>
      <AuthProvider>
        <PopupProvider>
          <App />
        </PopupProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
