import React from 'react';
import logo from "@/shared/assets/icons/logo.svg";

const Header: React.FC = () => {
    return (
        <header className='py-10 absolute h-[20vh] w-full z-10'>
            <div className="_container flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <img className='w-15 h-15 -mb-[-10px]' src={logo} alt="" />
                    <div className="text-2xl italic font-bold">TeaToDo</div>
                </div>
                <nav className="">
                    <ul className="flex items-center gap-6">
                        <li><a href="#home" className="text-lg font-semibold link hover:underline">Home</a></li>
                        <li><a href="#about" className="text-lg font-semibold link hover:underline">About us</a></li>
                        <li><a href="#features" className="text-lg font-semibold link hover:underline">Features</a></li>
                    </ul>
                </nav>
                <div className="flex items-center gap-4">
                    <div className="hover:underline cursor-pointer">Sign in</div>
                    <span>/</span>
                    <div className="hover:underline cursor-pointer">Sign up</div>
                </div>
            </div>
        </header>
    );
}

export default Header;