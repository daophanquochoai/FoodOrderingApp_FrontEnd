import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import RequireAuth from '../guards/RequireAuth';
import ClientLayout from '../layouts/ClientLayout';
import AdminLayout from '../layouts/AdminLayout';
import LoadingPage from '@/pages/LoadingPage';
import ServerError500 from '@/pages/500';
import ScrollToTop from '../components/common/ScrollToTop';
import TitleRoute from './TitleRoute';

// ===== Lazy imports =====
const CheckoutWrapper = lazy(() => import('../pages/client/checkout/CheckoutWrapper'));
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
const OrderManagement = lazy(() => import('@/pages/admin/orderManagement'));
const OrderManagementChef = lazy(() => import('@/pages/admin/orderManagement/OrderChef'));
const OrderManagementShipper = lazy(() => import('@/pages/admin/orderManagement/OrderShipper'));
const EmployeeAccountManagement = lazy(
    () => import('@/pages/admin/accountManagement/EmployeeAccount')
);
const StoreInformation = lazy(() => import('@/pages/admin/storeInformation'));
const ImportManagement = lazy(() => import('@/pages/admin/importManagement'));
const HomepageManagement = lazy(() => import('@/pages/admin/homepageManagement'));
const ShopByCategories = lazy(() => import('@/pages/admin/homepageManagement/ShopByCategories'));
const LatestProduct = lazy(() => import('@/pages/admin/homepageManagement/LatestProduct'));
const DealOfTheWeek = lazy(() => import('@/pages/admin/homepageManagement/DealOfTheWeek'));

const clientRoutes = [
    { path: '/', title: 'Home', element: <Home /> },
    { path: '/login', title: 'Login', element: <Login /> },
    { path: '/about', title: 'About Us', element: <About /> },
    { path: '/contact', title: 'Contact', element: <Contact /> },
    { path: '/privacy-policy', title: 'Privacy Policy', element: <PrivacyPolicy /> },
    { path: '/refund-policy', title: 'Refund Policy', element: <RefundPolicy /> },
    { path: '/shipping-policy', title: 'Shipping Policy', element: <ShippingPolicy /> },
    { path: '/terms-of-service', title: 'Terms of Service', element: <TermsOfService /> },
    { path: '/policy-for-buyers', title: 'Policy for Buyers', element: <PolicyForBuyers /> },
    { path: '/account/register', title: 'Register', element: <Register /> },
    { path: '/account/login', title: 'Login', element: <Login /> },
    { path: '/account/forgot-password', title: 'Forgot Password', element: <ForgotPassword /> },
    { path: '/account/reset/:token', title: 'Reset Password', element: <ResetPassword /> },
    { path: '/collections', title: 'Collections', element: <Collections /> },
    { path: '/products/:id', title: 'Product Details', element: <ProductDetail /> },
    { path: '/cart', title: 'Shopping Cart', element: <Cart /> },
    {
        path: '/account',
        title: 'My Account',
        element: <Account />,
        children: [
            { path: 'customer', title: 'Account Information', element: <UserInfo /> },
            { path: 'addresses', title: 'Address Book', element: <UserAddress /> },
            { path: 'orders', title: 'My Orders', element: <UserOrder /> },
            { path: 'orders/order-detail', title: 'Order Details', element: <UserOrderDetail /> },
            { path: 'vouchers', title: 'My Vouchers', element: <UserVoucher /> },
            { path: 'points', title: 'My Points', element: <UserPoint /> },
        ],
    },
    { path: '*', title: 'Page Not Found', element: <NotFound /> },
];

const adminRoutes = [
    { path: '', title: 'Dashboard', element: <Dashboard /> },
    { path: 'settings', title: 'Settings', element: <Setting /> },
    { path: 'category-management', title: 'Category Management', element: <CategoryManagement /> },
    {
        path: 'ingredient-management',
        title: 'Ingredient Management',
        element: <IngredientManagement />,
    },
    { path: 'ingredient-management/:id', title: 'View Ingredient', element: <ViewIngredient /> },
    { path: 'spoil-ingredient', title: 'Spoil Ingredient', element: <SpoilIngredient /> },
    { path: 'product-management', title: 'Product Management', element: <ProductManagement /> },
    { path: 'voucher-management', title: 'Voucher Management', element: <VoucherManagement /> },
    { path: 'voucher-management/export', title: 'Export Voucher', element: <ExportVoucher /> },
    {
        path: 'product-management/add',
        title: 'Add Product',
        element: <AddAndEditProductManagement />,
    },
    {
        path: 'product-management/edit',
        title: 'Edit Product',
        element: <AddAndEditProductManagement />,
    },
    { path: 'source-management', title: 'Source Management', element: <SourceManagement /> },
    { path: 'import-management', title: 'Import Management', element: <ImportManagement /> },
    { path: 'order-management', title: 'Order Management', element: <OrderManagement /> },
    { path: 'order-management-chef', title: 'Chef Orders', element: <OrderManagementChef /> },
    {
        path: 'order-management-shipper',
        title: 'Shipper Orders',
        element: <OrderManagementShipper />,
    },
    { path: 'recipe-management', title: 'Recipe Management', element: <RecipeManagement /> },
    { path: 'account', title: 'Account Management', element: <AccountAdmin /> },
    {
        path: 'ingredient-statistics',
        title: 'Ingredient Statistics',
        element: <IngredientStatistics />,
    },
    {
        path: 'employee-account-management',
        title: 'Employee Account Management',
        element: <EmployeeAccountManagement />,
    },
    { path: 'store-information', title: 'Store Information', element: <StoreInformation /> },
    { path: 'homepage-management', title: 'Homepage Management', element: <HomepageManagement /> },
    {
        path: 'homepage-management/shop-by-categories',
        title: 'Shop by Categories',
        element: <ShopByCategories />,
    },
    {
        path: 'homepage-management/latest-products',
        title: 'Latest Products',
        element: <LatestProduct />,
    },
    {
        path: 'homepage-management/deal-of-the-week',
        title: 'Deal of the Week',
        element: <DealOfTheWeek />,
    },
];

// ===== routes =====
const AppRoutes = () => {
    return (
        <Suspense fallback={<LoadingPage />}>
            <ScrollToTop />
            <Routes>
                {/* Client routes */}
                <Route element={<ClientLayout />}>
                    {clientRoutes.map(({ path, title, element, children }) =>
                        children ? (
                            <Route key={path} element={<TitleRoute title={title} />}>
                                <Route path={path} element={element}>
                                    {children.map(
                                        ({
                                            path: childPath,
                                            title: childTitle,
                                            element: childElement,
                                        }) => (
                                            <Route
                                                key={`${path}/${childPath}`}
                                                element={<TitleRoute title={childTitle} />}
                                            >
                                                <Route path={childPath} element={childElement} />
                                            </Route>
                                        )
                                    )}
                                </Route>
                            </Route>
                        ) : (
                            <Route key={path} element={<TitleRoute title={title} />}>
                                <Route path={path} element={element} />
                            </Route>
                        )
                    )}
                </Route>

                {/* Checkout route */}
                <Route element={<TitleRoute title="Checkout" />}>
                    <Route path="/checkouts" element={<CheckoutWrapper />} />
                </Route>

                {/* Admin routes */}
                <Route
                    path="/admin"
                    element={
                        <RequireAuth>
                            <AdminLayout />
                        </RequireAuth>
                    }
                >
                    {adminRoutes.map(({ path, title, element }) => (
                        <Route key={path} element={<TitleRoute title={title} />}>
                            <Route path={path} element={element} />
                        </Route>
                    ))}
                </Route>

                {/* Error routes */}
                <Route element={<TitleRoute title="Server Error" />}>
                    <Route path="/500" element={<ServerError500 />} />
                </Route>
                <Route element={<TitleRoute title="Page Not Found" />}>
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
