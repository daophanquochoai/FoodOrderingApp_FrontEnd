import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import RequireAuth from '../guards/RequireAuth';
import ClientLayout from '../layouts/ClientLayout';
import AdminLayout from '../layouts/AdminLayout';
import LoadingPage from '@/pages/LoadingPage';
import ServerError500 from '@/pages/500';
import ScrollToTop from '../components/common/ScrollToTop';

const Home = lazy(() => import('../pages/client/home/Home'));
const About = lazy(() => import('../pages/client/about/About'));
const Dashboard = lazy(() => import('../pages/admin/dashboard/Dashboard'));
const Setting = lazy(() => import('../pages/admin/setting/Setting'));
const CategoryManagement = lazy(() => import('../pages/admin/category/CategoryManagement'));
const NotFound = lazy(() => import('../pages/NotFound'));
const Register = lazy(() => import('../pages/client/auth/Register'));
const Login = lazy(() => import('../pages/client/auth/Login'));
const ForgotPassword = lazy(() => import('../pages/client/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('../pages/client/auth/ResetPassword'));
const Contact = lazy(() => import('../pages/client/contact/Contact'));
const PrivacyPolicy = lazy(() => import('../pages/policy/PrivacyPolicy'));
const RefundPolicy = lazy(() => import('../pages/policy/RefundPolicy'));
const ShippingPolicy = lazy(() => import('../pages/policy/ShippingPolicy'));
const TermsOfService = lazy(() => import('../pages/policy/TermsOfService'));
const PolicyForBuyers = lazy(() => import('../pages/policy/PolicyForBuyers'));
const Collections = lazy(() => import('../pages/client/collection/Collections'));
const ProductDetail = lazy(() => import('../pages/client/product/ProductDetail'));
const Checkout = lazy(() => import('../pages/client/checkout/Checkout'));
const Cart = lazy(() => import('../pages/client/cart/Cart'));
const Account = lazy(() => import('../pages/client/account/Account'));
const UserInfo = lazy(() => import('../pages/client/account/UserInfo'));
const UserAddress = lazy(() => import('../pages/client/account/UserAddress'));
const UserOrder = lazy(() => import('../pages/client/account/UserOrder'));
const UserVoucher = lazy(() => import('../pages/client/account/UserVoucher'));
const UserPoint = lazy(() => import('../pages/client/account/UserPoint'));
const IngredientManagement = lazy(() => import('../pages/admin/ingredientManagement'));

const AppRoutes = () => {
    return (
        <Suspense fallback={<LoadingPage />}>
            <ScrollToTop />
            <Routes>
                {/* client routes */}
                <Route element={<ClientLayout />}>
                    <Route path="/login" element={<Login />} />
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

                    {/* product detail route */}
                    <Route path="/products/:id" element={<ProductDetail />} />

                    {/* cart */}
                    <Route path="/cart" element={<Cart />} />

                    {/* account route */}
                    <Route path="/account/" element={<Account />}>
                        <Route path="customer" element={<UserInfo />} />
                        <Route path="addresses" element={<UserAddress />} />
                        <Route path="orders" element={<UserOrder />} />
                        <Route path="vouchers" element={<UserVoucher />} />
                        <Route path="points" element={<UserPoint />} />
                    </Route>

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
                    <Route path="category-management" element={<CategoryManagement />} />
                    <Route path="ingredient-management" element={<IngredientManagement />} />
                </Route>

                <Route path="/500" element={<ServerError500 />} />
                {/* 404 */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
