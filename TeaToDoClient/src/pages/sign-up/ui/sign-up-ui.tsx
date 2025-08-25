import React from 'react';
import authBg from "@/shared/assets/backgrounds/auth-background.jpg";
import { SignUpForm } from '@/widgets/sign-up-form';
import { Link } from 'react-router-dom';

const SignUp: React.FC = () => {
    return (
        <div className="fixed flex items-center justify-center h-screen max-lg:w-full">
            <div className="h-screen w-[50vw] max-lg:hidden">
                <img src={authBg} alt="ToDo Auth Image" className="w-full h-full object-cover" />
            </div>
            <SignUpForm />
            <Link to="/sign-in" className="underline absolute top-10 right-10">Sign in</Link>
        </div>
    );
}

export default SignUp;