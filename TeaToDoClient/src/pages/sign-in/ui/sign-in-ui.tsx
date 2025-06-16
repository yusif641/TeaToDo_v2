import { SignInForm } from '@/widgets/sign-in-form';
import React from 'react';
import authBg from "@/shared/assets/backgrounds/auth-background.jpg";

const SignIn: React.FC = () => {
    return (
        <div className="fixed flex items-center justify-center h-screen">
            <img src={authBg} alt="ToDo Auth Image" className="w-[50vw]" />
            <SignInForm />
            <a href="" className="underline absolute top-10 right-10">Sign up</a>
        </div>
    );
}

export default SignIn;