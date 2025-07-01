import { ErrorBoundary } from "@sentry/react";
import AppRoutes from "./router";

// function MyComponent() {
//   // Gây lỗi thử để test Sentry
//   throw new Error("Lỗi thử nghiệm trong MyComponent!");
//   return <div>Xin chào</div>;
// }

function App() {
  return (
    <ErrorBoundary fallback={<p className="text-red-500">Đã xảy ra lỗi!</p>}>
      {/* <MyComponent /> */}
      <AppRoutes />
    </ErrorBoundary>
  );
}

export default App;
