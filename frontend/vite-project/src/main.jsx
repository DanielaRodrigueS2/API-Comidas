import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AlteraFundo } from './contexts/ContextoTema.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AlteraFundo>
       <App />
    </AlteraFundo>
  </StrictMode>,
)
