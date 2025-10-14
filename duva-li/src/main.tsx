import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App";
import HeatMap from "./pages/HeatMap";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<App />} />
        <Route path="/heatmap" element={<HeatMap />} />
      </Route>  
    </Routes>
  </BrowserRouter>
);
