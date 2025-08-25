import React from 'react';
import logo from "@/shared/assets/icons/logo.svg";
import { FaDiscord, FaTelegram } from 'react-icons/fa';

const Footer: React.FC = () => {
    return (
        <footer className="footer border-t-2 border-accent py-15">
            <div className="_container flex justify-between gap-10 flex-wrap max-sm:flex-col max-sm:text-center">
                <div className="mx-auto max-sm:text-center">
                    <div className="flex items-center gap-4">
                        <img className='w-8 h-8 -mb-[-10px]' src={logo} alt="" />
                        <div className="text-xl italic font-bold">TeaToDo</div>
                    </div>
                    <p className='text-sm text-[#797979] italic'>Made with tea</p>
                </div>
                <ul className='flex flex-col gap-2 mx-auto'>
                    <li><a href="#home" className='hover:underline'>Home</a></li>
                    <li><a href="#about" className='hover:underline'>About us</a></li>
                    <li><a href="#features" className='hover:underline'>Features</a></li>
                </ul>
                <ul className='flex flex-col gap-2 mx-auto'>
                    <li><a href="https://youtu.be/80gZzF0E-c4?si=UnrB05v6xwqQ285F" className='hover:underline'>Policy & Privacy</a></li>
                    <li><a href="" className='hover:underline'>Terms & Conditions</a></li>
                    <li><a href="https://youtu.be/dQw4w9WgXcQ?si=nIMEBr06_4jQpOCm" className='hover:underline'>Stupid Video</a></li>
                    <li className='flex gap-5 mt-2 max-sm:justify-center'>
                        <a href="https://t.me/BGLegendBG">
                            <FaTelegram size={25} />
                        </a>
                        <a href="https://discord.com/users/legendbg">
                            <FaDiscord size={25} />
                        </a>
                    </li>
                </ul>
                <p className="mx-auto">@Copyright 2025</p>
            </div>
        </footer>
    );
};

export default Footer;