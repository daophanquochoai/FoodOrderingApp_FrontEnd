import { Routes, Route } from "react-router-dom";
import Home from "../pages/client/home/Home";
import About from "../pages/client/about/About";
import RequireAuth from "../guards/RequireAuth";
import ClientLayout from "../layouts/ClientLayout";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/dashboard/Dashboard";
import Setting from "../pages/admin/setting/Setting";
import NotFound from "../pages/NotFound";
import Register from "../pages/client/auth/Register";
import Login from "../pages/client/auth/Login";
import ForgotPassword from "../pages/client/auth/ForgotPassword";
import ResetPassword from "../pages/client/auth/ResetPassword";

const AppRoutes = () => {
  return (
    <Routes>
      {/* client routes */}
      <Route element={<ClientLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/account/register" element={<Register />} />
        <Route path="/account/login" element={<Login />} />
        <Route path="/account/forgot-password" element={<ForgotPassword />} />
        <Route path="/account/reset/:token" element={<ResetPassword />} />
      </Route>

      {/* admin routes */}
      <Route
        path="/admin"
        element={
          <RequireAuth>
            <AdminLayout />
          </RequireAuth>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="settings" element={<Setting />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
