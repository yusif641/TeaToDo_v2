import { useAuthStore } from '@/features/auth'
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow'
import Home from './home-ui';

const PrivateHome: React.FC = () => {
    const isAuth = useAuthStore(useShallow(state => state.isAuth));
    const isActivated = useAuthStore(useShallow(state => state.isActivated));

    if (!isAuth) return <Navigate to="/sign-up" replace />;
    if (!isActivated) return <Navigate to="/verify" replace />;

    return (
        <Home />
    );
}

export default PrivateHome;