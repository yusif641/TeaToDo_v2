import { SidebarMenuButton, SidebarMenuItem } from '@/shared/components/ui/sidebar';
import React from 'react';
import { FaEllipsisH } from 'react-icons/fa';

const TaskGroup: React.FC = () => {
    return (
        <SidebarMenuItem>
            <SidebarMenuButton asChild>
                <div className='cursor-pointer flex justify-between hover:[&>span]:block'>
                    <div className="flex gap-2">
                        <span>❤️‍🔥</span>
                        <span>Text</span>
                    </div>
                    <span className='hidden'><FaEllipsisH /></span>
                </div>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
}

export default TaskGroup;