import React from 'react';
import authBg from "@/shared/assets/backgrounds/auth-background.jpg";
import { SignUpForm } from '@/widgets/sign-up-form';

const SignUp: React.FC = () => {
    return (
        <div className="fixed flex items-center justify-center h-screen">
            <img src={authBg} alt="ToDo Auth Image" className="w-[50vw]" />
            <SignUpForm />
            <a href="" className="underline absolute top-10 right-10">Sign in</a>
        </div>
    );
}

export default SignUp;