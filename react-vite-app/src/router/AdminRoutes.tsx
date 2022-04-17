import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import V1 from '@/pages/V1';
import V2 from '@/pages/V2';
import About from '@/pages/About';
const AdminRoutes = [
    {
        path: '/Home',
        element: <Home />
    },
    {
        path: '/About',
        element: <About />,
        children: [
            {
                path: 'V1',
                element: <V1 />
            },
            {
                path: 'V2',
                element: <V2 />
            }
        ]
    },
    {
        path: '/NotFound',
        element: <NotFound />
    }
];

export default function () {
    return useRoutes([
        {
            path: '/',
            element: <Navigate to="/Home" />
        },
        ...AdminRoutes
    ]);
}
