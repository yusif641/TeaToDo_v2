import React, { useEffect } from 'react';
import Activate from './activate-ui';
import { useAuthStore } from '@/features/auth';
import { useShallow } from 'zustand/react/shallow';
import { useNavigate } from 'react-router-dom';

const PrivateActivate: React.FC = () => {
    const isAuth = useAuthStore(useShallow(state => state.isAuth));
    const isActivated = useAuthStore(useShallow(state => state.isActivated));

    const navigate = useNavigate();

    const checkPrivate = () => {
        if (!isAuth) navigate("/sign-up")
        if (!isActivated) navigate("/verify")
    }

    useEffect(() => {
        checkPrivate();
    }, [isActivated, isAuth])

    return (
        <Activate />
    );
}

export default PrivateActivate;