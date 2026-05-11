import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ConfigProvider } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import RegisterPage from './pages/register.jsx';
import UserPage from './pages/user.jsx';
import HomePage from './pages/home.jsx';
import LoginPage from './pages/login.jsx';
import { AuthWrapper } from './components/context/auth.context.jsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "user",
                element: <UserPage />
            },
        ]
    },
    {
        path: "register",
        element: <RegisterPage />
    },
    {
        path: "login",
        element: <LoginPage />
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#667eea',
                    fontFamily: 'Inter, sans-serif',
                    borderRadius: 8,
                },
            }}
        >
            <AuthWrapper>
                <RouterProvider router={router} />
            </AuthWrapper>
        </ConfigProvider>
    </React.StrictMode>,
)