import React from 'react';
import { FaEnvelope } from "react-icons/fa";

const Verify: React.FC = () => {
    return (
        <section className="w-screen h-screen flex justify-center items-center">
            <div className="max-w-[400px] text-center rounded-sm border-1 p-7 border-[#989A99]">
                <FaEnvelope size={70} className='m-auto mb-5' />
                <h2 className='mb-5 text-xl font-medium]'>We've send an activation link to your email</h2>
                <p>
                    We've sent a confirmation email to your inbox. Click the link 
                    inside to verify your address and complete registration. Can't 
                    find the email? Check your Spam folder.
                </p>
            </div>
        </section>
    )
}

export default Verify;