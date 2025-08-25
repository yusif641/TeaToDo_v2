import { TaskGroup, useTaskGroups } from '@/entities/task-group'
import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu } from '@/shared/components/ui/sidebar'
import { Skeleton } from '@/shared/components/ui/skeleton'
import React from 'react'

const SidebarContentUI: React.FC = () => {
    const { taskGroupsData, taskGroupsPending } = useTaskGroups();

    return (
        <SidebarContent className='scrollbar overflow-y-auto'>
            <SidebarGroup className=''>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {taskGroupsPending && (
                            <div>
                                {[1, 2, 3, 4, 5].map(skeleton => (
                                    <div className="flex gap-2 px-2 py-1 items-center" key={skeleton}>
                                        <Skeleton className='w-5 h-5 rounded-full' />
                                        <Skeleton className='h-4 w-full' />
                                    </div>
                                ))}
                            </div>
                        )}
                        {taskGroupsData?.map(taskGroup => (
                            taskGroupsPending
                                ? (null)
                                : (<TaskGroup
                                    name={taskGroup.name}
                                    icon={taskGroup.icon!}
                                    key={taskGroup.task_group_id}
                                    taskGroupId={taskGroup.task_group_id}
                                />)
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
    )
}

export default SidebarContentUI