import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

import "./index.css";
import "normalize.css";

import App from "./components/App.tsx";
import Settings from "./components/Settings.tsx";
import Details from "./components/Details.tsx";
import Modules from "./components/Modules.tsx";

createRoot(document.getElementById("root")!).render(
  // Strictmode renders twice (dev, not prod) 2 try 2 catch problems in advance
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/details" element={<Details />} />
        <Route path="/modules" element={<Modules />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);

