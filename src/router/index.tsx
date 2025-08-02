import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import RequireAuth from '../guards/RequireAuth';
import ClientLayout from '../layouts/ClientLayout';
import AdminLayout from '../layouts/AdminLayout';
import LoadingPage from '@/pages/LoadingPage';
import ServerError500 from '@/pages/500';
import ScrollToTop from '../components/common/ScrollToTop';
import OrderManagement from '@/pages/admin/orderManagement';

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
const UserOrderDetail = lazy(() => import('../pages/client/account/UserOrderDetail'));
const UserVoucher = lazy(() => import('../pages/client/account/UserVoucher'));
const UserPoint = lazy(() => import('../pages/client/account/UserPoint'));
const IngredientManagement = lazy(() => import('../pages/admin/ingredientManagement'));
const ProductManagement = lazy(() => import('../pages/admin/productManagement'));
const AddAndEditProductManagement = lazy(
    () => import('../pages/admin/productManagement/AddEditProductManagement')
);
const VoucherManagement = lazy(() => import('../pages/admin/voucher/VoucherManagement'));
const ExportVoucher = lazy(() => import('../pages/admin/voucher/ExportVoucher'));
const ViewIngredient = lazy(() => import('@/pages/admin/ingredientManagement/ViewIngredient'));
const SpoilIngredient = lazy(() => import('@/pages/admin/ingredientManagement/SpoilIngredient'));
const SourceManagement = lazy(() => import('@/pages/admin/sourceManagement'));
const RecipeManagement = lazy(() => import('@/pages/admin/recipeManagement'));
const AccountAdmin = lazy(() => import('@/pages/admin/accountManagement/Account'));
const IngredientStatistics = lazy(() => import('@/pages/admin/statistics/ingredientStatistics'));
const OrderManagementChef = lazy(() => import('@/pages/admin/orderManagement/orderChef'));
const EmployeeAccountManagement = lazy(
    () => import('@/pages/admin/accountManagement/EmployeeAccount')
);
const StoreInformation = lazy(() => import('@/pages/admin/storeInformation'));
const ImportManagement = lazy(() => import('@/pages/admin/importManagement'));

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
                        <Route path="orders/order-detail" element={<UserOrderDetail />} />
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
                    <Route path="ingredient-management/:id" element={<ViewIngredient />} />
                    <Route path="spoil-ingredient" element={<SpoilIngredient />} />

                    <Route path="product-management" element={<ProductManagement />} />
                    <Route path="voucher-management" element={<VoucherManagement />} />
                    <Route path="voucher-management/export" element={<ExportVoucher />} />
                    <Route
                        path="product-management/add"
                        element={<AddAndEditProductManagement />}
                    />
                    <Route
                        path="product-management/edit"
                        element={<AddAndEditProductManagement />}
                    />

                    <Route path="source-management" element={<SourceManagement />} />

                    <Route path="import-management" element={<ImportManagement />} />

                    <Route path="order-management" element={<OrderManagement />} />

                    <Route path="order-management-chef" element={<OrderManagementChef />} />

                    <Route path="recipe-management" element={<RecipeManagement />} />

                    <Route path="account" element={<AccountAdmin />} />

                    <Route path="ingredient-statistics" element={<IngredientStatistics />} />

                    <Route
                        path="employee-account-management"
                        element={<EmployeeAccountManagement />}
                    />

                    <Route path="store-information" element={<StoreInformation />} />
                </Route>

                <Route path="/500" element={<ServerError500 />} />
                {/* 404 */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
