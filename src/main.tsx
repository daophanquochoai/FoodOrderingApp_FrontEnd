import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "./sentry/sentry.config";
import { BrowserRouter } from "react-router-dom";
import { ModalProvider } from "./hooks/context/ModalContext.tsx";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <QueryClientProvider client={queryClient} >
        <ModalProvider>
          <App />
        </ModalProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </Provider>
);
