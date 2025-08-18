import React, { useEffect, useRef, type ChangeEvent } from 'react';
import { Task } from '@/entities/task';
import { useTaskGroupStore, useTaskGroupTasks } from '@/entities/task-group';
import { useShallow } from 'zustand/react/shallow';
import { Button } from '@/shared/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { taskGroupApi } from '@/entities/task-group/api/task-group-api';
import { toast } from 'react-toastify';
import { queryClient } from '@/app/providers/queryClient';
import type { ErrorResponse } from '@/shared/api/api';
import { HOST_URL } from '@/shared/utils/constants';

const TaskGroupInfo: React.FC = () => {
    const taskGroup = useTaskGroupStore(useShallow(state => state.selectedTaskGrop));
    const taskGroupId = useTaskGroupStore(useShallow(state => state.selectedTaskGroupId));
    const setTaskGroup = useTaskGroupStore(useShallow(state => state.setTaskGroup));

    const { tasksData } = useTaskGroupTasks(true, taskGroupId as string);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const selectFile = () => fileInputRef.current?.click();

    const updateTaskGroupBackgroundMutation = useMutation({
        mutationKey: [taskGroupApi.baseKey, "background"],
        mutationFn: taskGroupApi.updateTaskGroupBackground,
        onError: (error) => {
            toast.error((error as ErrorResponse).response.data.message);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [taskGroupApi.baseKey] });
        },
        onSuccess: () => {
            toast.success("Background changed");
        }
    });

    const removeTaskGroupBackgroundMutation = useMutation({
        mutationKey: [taskGroupApi.baseKey, "background"],
        mutationFn: taskGroupApi.removeTaskGroupBackground,
        onError: (error) => {
            toast.error((error as ErrorResponse).response.data.message);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [taskGroupApi.baseKey] });
        },
        onSuccess: () => {
            toast.success("Background deleted");
        }
    });

    const handleBackgroundUpdate = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;

        if (file) {
            const formData = new FormData();
            formData.append('background', file);

            updateTaskGroupBackgroundMutation.mutate({
                formData,
                taskGroupId: taskGroupId!
            });
        }
    }

    const handleRemoveBackground = () => {
        removeTaskGroupBackgroundMutation.mutate(taskGroupId!);
    }

    useEffect(() => {
        if (updateTaskGroupBackgroundMutation.isSuccess) {
            setTaskGroup({
                name: taskGroup?.name!,
                icon: taskGroup?.icon!,
                banner: updateTaskGroupBackgroundMutation.data?.data.background_url!
            });
        }
    }, [updateTaskGroupBackgroundMutation.data]);

    useEffect(() => {
        if (removeTaskGroupBackgroundMutation.isSuccess) {
            setTaskGroup({
                name: taskGroup?.name!,
                icon: taskGroup?.icon!,
                banner: null
            });
        }
    }, [removeTaskGroupBackgroundMutation.data]);

    return (
        <div>
            <div className="-z-3 w-full max-h-40 overflow-hidden">
                {taskGroup?.banner
                    ? (
                        <div className="relative cursor-pointer hover:[&_div]:flex">
                            <img src={`${HOST_URL}/${taskGroup?.banner}`} className='w-full translate-y-[-50%]' alt="" />
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
                        <div className='text-7xl -ml-4'>{taskGroup?.icon}</div>
                        <div className='text-5xl font-bold mt-7'>{taskGroup?.name}</div>
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