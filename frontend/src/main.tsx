import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CartProvider } from './context/CartProvider.tsx'
import { CheckoutProvider } from './context/CheckoutProvider.tsx'
import { AuthProvider } from './context/AuthProvider.tsx'
import App from './App.tsx'
import './assets/styles.css'

import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <CheckoutProvider>
        <CartProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CartProvider>
      </CheckoutProvider>
    </AuthProvider>
  </StrictMode>,
)
