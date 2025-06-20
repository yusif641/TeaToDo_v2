import React from 'react';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu
} from '@/shared/components/ui/sidebar';
import { FaPlus } from 'react-icons/fa';
import { TaskGroup } from '@/entities/task-group';
import { User } from '@/entities/user';

const HomeSidebar: React.FC = () => {
    return (
        <Sidebar>
            <SidebarHeader className='pt-4 pr-4 pl-4'>
                <div className="flex justify-between items-center">
                    <span className='text-sm text-[#B0AFA9]'>Workspace</span>
                    <div title='Add Task Group' className='cursor-pointer'>
                        <FaPlus size={14} className='third-color' />
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <TaskGroup />
                            <TaskGroup />
                            <TaskGroup />
                            <TaskGroup />
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <User />
            </SidebarFooter>
        </Sidebar>
    );
}

export default HomeSidebar;