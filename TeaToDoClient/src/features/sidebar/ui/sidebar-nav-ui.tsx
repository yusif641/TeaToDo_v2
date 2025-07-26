import { SidebarTrigger } from '@/shared/components/ui/sidebar';
import React from 'react';
import { Link } from 'react-router-dom';

const SidebarNav: React.FC = () => {
    return (
        <div className="z-1 inline-flex pr-3 py-0.5 items-center gap-4 third-color text-sm m-3 bg-[#0a0a0a] rounded-sm absolute">
            <SidebarTrigger />
            <div>/</div>
            <Link to="/welcome" className="hover:underline cursor-pointer">Welcome page</Link>
            <div>/</div>
            <a href='https://t.me/BGLegendBG' className="hover:underline cursor-pointer">Developer contact</a>
        </div>
    );
}

export default SidebarNav;