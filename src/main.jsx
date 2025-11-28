import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { EnvProvider } from "./context/EnvContext.jsx";
import "./styles/index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <EnvProvider>
      <App />
    </EnvProvider>
  </StrictMode>
);
