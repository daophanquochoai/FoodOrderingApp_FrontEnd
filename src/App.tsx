import { ErrorBoundary } from "@sentry/react";
import AppRoutes from "./router";
import { useState } from "react";
import { ModalRenderer, ModalState } from "./components/modal";

// function MyComponent() {
//   // Gây lỗi thử để test Sentry
//   throw new Error("Lỗi thử nghiệm trong MyComponent!");
//   return <div>Xin chào</div>;
// }

function App() {
  const [modalState, setModalState] = useState<ModalState>({
    type: null,
  });

  return (
    <ErrorBoundary fallback={<p className="text-red-500">Đã xảy ra lỗi!</p>}>
      {/* <MyComponent /> */}
      <AppRoutes />
      <ModalRenderer />
    </ErrorBoundary>
  );
}

export default App;
