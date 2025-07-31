import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'

import './assets/styles/index.css'

import App from './pages/App.tsx'
import Details from './pages/Details.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/details' element={<Details/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
