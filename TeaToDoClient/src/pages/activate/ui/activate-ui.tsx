import React from 'react';
import { FaCheck } from 'react-icons/fa';

const Activate: React.FC = () => {
    return (
        <section className="w-screen h-screen flex justify-center items-center">
            <div className="max-w-[400px] text-center rounded-sm border-1 p-7 border-[#989A99]">
                <FaCheck size={70} className='m-auto mb-5' />
                <h2 className='mb-5 text-xl font-medium]'>Email Successfully Activated!</h2>
                <p className='mb-9'>
                    Your email has been confirmed and your account is now fully active. Welcome aboard!
                    You can now enjoy all the features of our service. Happy exploring!
                </p>
                <div className="bg-[#e5e5e5] text-[#0a0a0a] p-3 rounded-sm inline-block cursor-pointer">Go to the home</div>
            </div>
        </section>
    );
}

export default Activate;