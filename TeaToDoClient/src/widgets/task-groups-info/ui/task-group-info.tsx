import React, { useRef, type ChangeEvent } from 'react';
import { Task } from '@/entities/task';
import { useRemoveBackground, useSelectedTaskGroup, useTaskGroupBackground, useTaskGroupStore, useTaskGroupTasks } from '@/entities/task-group';
import { useShallow } from 'zustand/react/shallow';
import { Button } from '@/shared/components/ui/button';
import { HOST_URL } from '@/shared/utils/constants';

const TaskGroupInfo: React.FC = () => {
    const taskGroupId = useTaskGroupStore(useShallow(state => state.selectedTaskGroupId));
    
    const { tasksData } = useTaskGroupTasks(true, taskGroupId as string);
    const { selectedTaskGroup } = useSelectedTaskGroup(taskGroupId!);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const selectFile = () => fileInputRef.current?.click();

    const { removeTaskGroupBackground } = useRemoveBackground();
    const { updateTaskGroupBackground } = useTaskGroupBackground();

    const handleBackgroundUpdate = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;

        if (file) {
            const formData = new FormData();
            formData.append('background', file);

            updateTaskGroupBackground({
                formData,
                taskGroupId: taskGroupId!
            });
        }
    }

    const handleRemoveBackground = () => {
        removeTaskGroupBackground(taskGroupId!);
    }

    return (
        <div>
            <div className="-z-3 w-full max-h-40 overflow-hidden">
                {selectedTaskGroup?.background_url
                    ? (
                        <div className="relative cursor-pointer hover:[&_div]:flex">
                            <img src={`${HOST_URL}/${selectedTaskGroup?.background_url}`} className='w-full translate-y-[-50%]' alt="" />
                            <div className="w-full h-40 bg-[#131313b9] absolute top-0 hidden items-center justify-center">
                                <Button className='cursor-pointer' onClick={handleRemoveBackground}>Remove Background</Button>
                            </div>
                        </div>
                    )
                    : (
                        <div className="w-full bg-[#131313] h-40 flex items-center justify-center">
                            <Button variant="outline" className='cursor-pointer' onClick={selectFile}>Select Background</Button>
                            <input type="file" ref={fileInputRef} onChange={(e) => handleBackgroundUpdate(e)} className='hidden' name='avatar' accept='.png, .jpg, .jpeg, .svg, .webp' />
                        </div>
                    )
                }
            </div>
            <div className="flex flex-col items-center">
                <div className="w-200">
                    <div className="-translate-y-8 mb-4">
                        <div className='text-7xl -ml-4'>{selectedTaskGroup?.icon}</div>
                        <div className='text-5xl font-bold mt-7'>{selectedTaskGroup?.name}</div>
                    </div>
                    <div>
                        {tasksData?.map(task => (
                            <Task text={task.text} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaskGroupInfo;