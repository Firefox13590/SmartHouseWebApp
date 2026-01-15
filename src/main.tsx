import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
// import { StatusBar, Style } from '@capacitor/status-bar';
// import { Device } from '@capacitor/device';

import './assets/styles/index.css';

import App from './pages/App.tsx';
import Settings from './pages/Settings.tsx';
import Details from './pages/Details.tsx';
import Assistant from './pages/Assistant.tsx';



// const logDeviceInfo = async () => {
//   const info = await Device.getInfo();

//   console.log(info);
//   return info
// };

// const logBatteryInfo = async () => {
//   const info = await Device.getBatteryInfo();

//   console.log(info);
// };


// logDeviceInfo().then(infoDevice => {
//   console.log(infoDevice);
//   if(infoDevice.platform == "web"){
//     console.log("web");
//   }else{
//     console.log("mobile");
//     logBatteryInfo();
//     StatusBar.setStyle({style: Style.Dark});
//     StatusBar.setBackgroundColor({color: "#000"});
//     StatusBar.show();
//   }
// });


createRoot(document.getElementById('root')!).render(
  // Strictmode renders twice (dev, not prod) 2 try 2 catch problems in advance
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/settings' element={<Settings/>}/>
        <Route path='/details' element={<Details/>}/>
        <Route path='/assistant' element={<Assistant/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
