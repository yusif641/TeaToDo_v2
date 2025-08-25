import { SidebarTrigger } from '@/shared/components/ui/sidebar';
import React from 'react';
import { Link } from 'react-router-dom';

const SidebarNav: React.FC = () => {
    return (
        <div className="z-1 inline-flex pr-3 py-0.5 items-center gap-4 third-color text-sm m-3 bg-[#0a0a0a] rounded-sm absolute max-lg:pr-1 max-lg:py-0">
            <SidebarTrigger className='-mr-1' />
            <div className='max-lg:hidden'>/</div>
            <Link to="/" className="hover:underline cursor-pointer max-lg:hidden">Welcome page</Link>
            <div className='max-lg:hidden'>/</div>
            <a href='https://t.me/BGLegendBG' className="hover:underline cursor-pointer max-lg:hidden">Developer contact</a>
        </div>
    );
}

export default SidebarNav;