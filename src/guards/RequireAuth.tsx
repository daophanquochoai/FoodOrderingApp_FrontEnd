import { Navigate, useLocation } from 'react-router-dom';

interface RequireAuthProps {
    children: React.ReactNode;
}

const isAuthenticated = (): boolean => {
    return true;
    // return !!localStorage.getItem("token");
};

const RequireAuth = ({ children }: RequireAuthProps) => {
    const location = useLocation();

    if (!isAuthenticated()) {
        return <Navigate to={'/'} replace state={{ from: location }} />;
    }
    return children;
};

export default RequireAuth;
