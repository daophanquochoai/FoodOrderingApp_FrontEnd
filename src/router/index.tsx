
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
import Contact from "../pages/client/contact/Contact";
import PrivacyPolicy from "../pages/policy/PrivacyPolicy";
import RefundPolicy from "../pages/policy/RefundPolicy";
import ShippingPolicy from "../pages/policy/ShippingPolicy";
import TermsOfService from "../pages/policy/TermsOfService";
import PolicyForBuyers from "../pages/policy/PolicyForBuyers";
import Collections from "../pages/client/collection/Collections";
import CollectionDetail from "../pages/client/collection/CollectionDetail";
import ProductDetail from "../pages/product/ProductDetail";
import Checkout from "../pages/client/checkout/Checkout";


const AppRoutes = () => {
    return (
        <Routes>
            {/* client routes */}
            <Route element={<ClientLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />

                {/* policy routes */}
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />  
                <Route path="/refund-policy" element={<RefundPolicy />} />
                <Route path="/shipping-policy" element={<ShippingPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/policy-for-buyers" element={<PolicyForBuyers />} />

                {/* auth routes */}
                <Route path="/account/register" element={<Register />} />
                <Route path="/account/login" element={<Login />} />
                <Route path="/account/forgot-password" element={<ForgotPassword />} />
                <Route path="/account/reset/:token" element={<ResetPassword />} />

                {/* collection route */}
                <Route path="/collections" element={<Collections />} />
                <Route path="/collections/:categoryId" element={<CollectionDetail />} />

                {/* product detail route */}
                <Route path="/products/:product-name" element={<ProductDetail />} />

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Route>

              {/* checkout route */}
              <Route path="/checkouts" element={<Checkout />} />

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
