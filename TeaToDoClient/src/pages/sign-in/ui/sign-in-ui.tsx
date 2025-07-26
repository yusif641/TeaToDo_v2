import { SignInForm } from '@/widgets/sign-in-form';
import React from 'react';
import authBg from "@/shared/assets/backgrounds/auth-background.jpg";
import { Link } from 'react-router-dom';

const SignIn: React.FC = () => {
    return (
        <div className="fixed flex items-center justify-center h-screen">
            <img src={authBg} alt="ToDo Auth Image" className="w-[50vw]" />
            <SignInForm />
            <Link to="/sign-up" className="underline absolute top-10 right-10">Sign up</Link>
        </div>
    );
}

export default SignIn;