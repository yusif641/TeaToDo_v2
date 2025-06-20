import React from 'react';
import { SidebarProvider } from '@/shared/components/ui/sidebar';
import { HomeSidebar, SidebarNav } from '@/features/sidebar';
import { TaskGroupInfo, TaskGroupInfoEmpty } from '@/widgets/task-groups-info';

const Home: React.FC = () => {
    return (
        <SidebarProvider>
            <HomeSidebar />
            <main className='w-full overflow-y-hidden relative'>
                <SidebarNav />
                <TaskGroupInfo />
                {/* <TaskGroupInfoEmpty /> */}
            </main>
        </SidebarProvider>
    );
}

export default Home;