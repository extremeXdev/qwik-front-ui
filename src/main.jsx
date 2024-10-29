import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'


export const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)
