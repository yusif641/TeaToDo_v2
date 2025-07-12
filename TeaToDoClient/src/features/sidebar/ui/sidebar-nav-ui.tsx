import { SidebarTrigger } from '@/shared/components/ui/sidebar';
import React from 'react';

const SidebarNav: React.FC = () => {
    return (
        <div className="z-1 inline-flex pr-3 py-0.5 items-center gap-4 third-color text-sm m-3 bg-[#0a0a0a] rounded-sm absolute">
            <SidebarTrigger />
            <div>/</div>
            <div className="hover:underline cursor-pointer">Welcome page</div>
            <div>/</div>
            <div className="hover:underline cursor-pointer">Developer contact</div>
        </div>
    );
}

export default SidebarNav;