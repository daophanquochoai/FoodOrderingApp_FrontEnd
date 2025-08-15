import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const TitleRoute = ({ title }) => {
    useEffect(() => {
        if (title) {
            document.title = title;
        }
    }, [title]);

    return <Outlet />;
};

export default TitleRoute;
