import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import { Toaster } from 'react-hot-toast'
import ErrorBoundary from './components/ErrorBoundary.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
        <Toaster />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
