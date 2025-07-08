import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "./sentry/sentry.config";
import { BrowserRouter } from "react-router-dom";
import { ModalProvider } from "./hooks/context/ModalContext.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ModalProvider>
      <App />
    </ModalProvider>
  </BrowserRouter>
);
