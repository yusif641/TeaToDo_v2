import React from 'react';
import { SidebarProvider } from '@/shared/components/ui/sidebar';
import { HomeSidebar, SidebarNav } from '@/features/sidebar';
import { TaskGroupInfo, TaskGroupInfoEmpty } from '@/widgets/task-groups-info';
import { useTaskGroupStore } from '@/entities/task-group';
import { useShallow } from 'zustand/react/shallow';
import { AiOutlineClose } from 'react-icons/ai';

const Home: React.FC = () => {
    const selectedTaskGroupId = useTaskGroupStore(useShallow(state => state.selectedTaskGroupId));
    const setSelectedToNull = useTaskGroupStore(useShallow(state => state.setSelectedToNull));

    return (
        <SidebarProvider className='relative'>
            <HomeSidebar />
            <main className='w-full overflow-y-hidden relative bg-[#121212]'>
                <SidebarNav />
                {selectedTaskGroupId
                    ? <TaskGroupInfo />
                    : <TaskGroupInfoEmpty />
                }
            </main>
            {selectedTaskGroupId && (
                <div className="absolute w-10 h-10 top-5 right-0 cursor-pointer" onClick={setSelectedToNull}>
                    <AiOutlineClose size={20} />
                </div>
            )}
        </SidebarProvider>
    );
}

export default Home;