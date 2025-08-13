import React from 'react';
import logo from "@/shared/assets/icons/logo.svg";
import { Link } from 'react-router-dom';
import { useUser } from '@/entities/user';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';

const Header: React.FC = () => {
    const { data } = useUser();

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
                {data
                    ? (
                        <Link to="/home" className="flex items-center gap-5">
                            <Avatar className='rounded-lg w-12 h-12'>
                                <AvatarImage src={data?.avatar_url || ""} />
                                <AvatarFallback className='rounded-lg w-12 h-12'>{data?.nickname.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>{data.nickname}</div>
                        </Link>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link to="/sign-in" className="hover:underline cursor-pointer">Sign in</Link>
                            <span>/</span>
                            <Link to="/sign-up" className="hover:underline cursor-pointer">Sign up</Link>
                        </div>
                    )
                }
            </div>
        </header>
    );
}

export default Header;