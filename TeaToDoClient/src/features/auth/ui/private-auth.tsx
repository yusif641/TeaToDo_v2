import { type JSX } from 'react';
import { useAuthStore } from '../models/auth-store';
import { useShallow } from 'zustand/react/shallow';
import { Navigate } from 'react-router-dom';

type PrivateRouteChildren = {
    children: JSX.Element
}

const PrivateAuth = ({ children }: PrivateRouteChildren) => {
    const isAuth = useAuthStore(useShallow(state => state.isAuth));
    const isActivated = useAuthStore(useShallow(state => state.isActivated));
    
    if (isAuth && isActivated) return <Navigate to="/home" replace />

    return (
        children
    )
}

export default PrivateAuth;