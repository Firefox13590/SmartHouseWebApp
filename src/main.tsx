import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';


import './assets/styles/index.css';

import App from './pages/App.tsx';
import Settings from './pages/Settings.tsx';
import Details from './pages/Details.tsx';
import Modules from './pages/Modules.tsx';



createRoot(document.getElementById('root')!).render(
  // Strictmode renders twice (dev, not prod) 2 try 2 catch problems in advance
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/settings' element={<Settings/>}/>
        <Route path='/details' element={<Details/>}/>
        <Route path='/modules' element={<Modules/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
