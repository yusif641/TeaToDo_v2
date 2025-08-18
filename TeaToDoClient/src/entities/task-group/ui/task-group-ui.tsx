import { SidebarMenuButton, SidebarMenuItem } from '@/shared/components/ui/sidebar';
import React, { useEffect, useRef, useState } from 'react';
import { FaEllipsisH, FaSave } from 'react-icons/fa';
import { useTaskGroupStore } from '../models/task-group-store';
import { useShallow } from 'zustand/react/shallow';
import { useTaskGroupTasks } from '../hooks/useTaskGroupTasks';
import { Input } from '@/shared/components/ui/input';
import { useMutation } from '@tanstack/react-query';
import { taskGroupApi, type TaskGroupResponce } from '../api/task-group-api';
import { queryClient } from '@/app/providers/queryClient';
import { toast } from 'react-toastify';
import type { ErrorResponse, ValidationErrorResponce } from '@/shared/api/api';
import type { AxiosResponse } from 'axios';
import EmojiPicker, { Theme, type EmojiClickData } from 'emoji-picker-react';

const TaskGroup: React.FC<{ icon: string, name: string, taskGroupId: string, banner: string | null }> = ({ icon, name, taskGroupId, banner }) => {
    const setTaskGroupSelectedId = useTaskGroupStore(useShallow(state => state.setSelectedTaskGroupId));
    const setTaskGroup = useTaskGroupStore(useShallow(state => state.setTaskGroup));
    const selectedTaskGroupId = useTaskGroupStore(useShallow(state => state.selectedTaskGroupId));

    const [editMode, setEditMode] = useState(false);
    const [editName, setEditName] = useState("");
    const [openDropdown, setOpenDropdown] = useState(false);
    const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const editRef = useRef<HTMLDivElement>(null);
    const saveRef = useRef<HTMLDivElement>(null);
    const optionsRef = useRef<HTMLDivElement>(null);
    const emojiRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<HTMLDivElement>(null);

    const { refetchTasks } = useTaskGroupTasks(false, taskGroupId);

    useEffect(() => {
        const handleClickOutside = (event: React.TouchEvent | MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && event.target !== dropdownRef.current) {
                setOpenDropdown(false);
            }

            if (editRef.current && !editRef.current.contains(event.target as Node) && event.target !== editRef.current && !saveRef.current?.contains(event.target as Node)) {
                setEditMode(false);
            }

            if (emojiRef.current && !emojiRef.current.contains(event.target as Node)) {
                setEmojiPickerOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [dropdownRef, editRef, saveRef, emojiRef, iconRef]);

    const updateTaskGroupNameMutations = useMutation({
        mutationKey: [taskGroupApi.baseKey, "name"],
        mutationFn: taskGroupApi.updateTaskGroupName,
        onMutate: async (params) => {
            await queryClient.cancelQueries({ queryKey: [taskGroupApi.baseKey] });

            const previosTaskGroups: AxiosResponse<TaskGroupResponce[]> = queryClient.getQueryData([taskGroupApi.baseKey])!;

            queryClient.setQueryData(
                [taskGroupApi.baseKey],
                () => previosTaskGroups.data?.map(taskGroup => taskGroup.task_group_id === params.taskGroupId ? { ...taskGroup, name: params.name } : taskGroup)
            );

            return { previosTaskGroups }
        },
        onError: (error, _, context) => {
            queryClient.setQueryData([taskGroupApi.baseKey], context?.previosTaskGroups);

            const data = (error as ErrorResponse).response.data;

            if ((data.errors as ValidationErrorResponce).details) {
                toast.error((data.errors as ValidationErrorResponce).details[0].message);
            } else {
                toast.error(data.message);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [taskGroupApi.baseKey] });
        },
        onSuccess: () => {
            toast.success("Task Group Updated");
        }
    });

    const deleteTaskGroupMutation = useMutation({
        mutationFn: taskGroupApi.deleteTaskGroup,
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [taskGroupApi.baseKey] });
        },
        onSuccess: (_, taskGroupId) => {
            const taskGroups: AxiosResponse<TaskGroupResponce[]> = queryClient.getQueryData([taskGroupApi.baseKey])!;

            if (taskGroups) {
                queryClient.setQueryData(
                    [taskGroupApi.baseKey],
                    taskGroups.data.filter(item => item.task_group_id !== taskGroupId).reverse()
                );

                toast.success("Task Group Deleted");
            }
        },
        onError: (error) => {
            const data = (error as ErrorResponse).response.data;

            if ((data.errors as ValidationErrorResponce).details) {
                toast.error((data.errors as ValidationErrorResponce).details[0].message);
            } else {
                toast.error(data.message);
            }
        }
    })

    const updateTaskGroupIconMutations = useMutation({
        mutationKey: [taskGroupApi.baseKey, "icon"],
        mutationFn: taskGroupApi.updateTaskGroupIcon,
        onMutate: async (params) => {
            await queryClient.cancelQueries({ queryKey: [taskGroupApi.baseKey] });

            const previosTaskGroups: AxiosResponse<TaskGroupResponce[]> = queryClient.getQueryData([taskGroupApi.baseKey])!;

            queryClient.setQueryData(
                [taskGroupApi.baseKey],
                () => previosTaskGroups.data?.map(taskGroup => taskGroup.task_group_id === params.taskGroupId ? { ...taskGroup, icon: params.icon } : taskGroup)
            );

            return { previosTaskGroups }
        },
        onError: (error, _, context) => {
            queryClient.setQueryData([taskGroupApi.baseKey], context?.previosTaskGroups);

            const data = (error as ErrorResponse).response.data;

            if ((data.errors as ValidationErrorResponce).details) {
                toast.error((data.errors as ValidationErrorResponce).details[0].message);
            } else {
                toast.error(data.message);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [taskGroupApi.baseKey] });
        },
        onSuccess: () => {
            toast.success("Task Group Icon Updated");
        }
    });

    const handleUpdateName = () => {
        updateTaskGroupNameMutations.mutate({
            taskGroupId,
            name: editName || name
        });

        setEditMode(false);
    }

    const handleRefetch = (event: React.MouseEvent) => {
        if (!optionsRef.current?.contains(event.target as Node)) {
            setTaskGroup({
                name,
                icon,
                banner,
            });

            setTaskGroupSelectedId(taskGroupId);
            refetchTasks();
        }
    }

    const changeMode = () => {
        setEditMode(true);
        setOpenDropdown(false);
    }

    const handleDelete = () => {
        setOpenDropdown(false);
        deleteTaskGroupMutation.mutate(taskGroupId);

        if (selectedTaskGroupId == taskGroupId) {
            setTaskGroupSelectedId(null);
        }
    }

    const handleUpdateIcon = (emoji: EmojiClickData) => {
        setEmojiPickerOpen(false);

        updateTaskGroupIconMutations.mutate({
            taskGroupId,
            icon: emoji.emoji
        });
    }

    return (
        <SidebarMenuItem className='relative'>
            <SidebarMenuButton asChild onClick={(event) => handleRefetch(event)}>
                <div className='cursor-pointer flex justify-between hover:[&>span]:flex'>
                    {editMode
                        ? (
                            <div className="flex gap-2 items-center" ref={editRef}>
                                <div className="bg-[#44444421] rounded-sm p-1 border-1 w-8 flex items-center justify-center h-7 cursor-pointer" onClick={() => setEmojiPickerOpen(true)} ref={iconRef}>{icon}</div>
                                <div className="absolute top-0 -right-3 translate-x-full z-20" ref={emojiRef}>
                                    <EmojiPicker
                                        theme={Theme.DARK}
                                        open={emojiPickerOpen}
                                        onEmojiClick={handleUpdateIcon}
                                        autoFocusSearch={false}
                                    />
                                </div>
                                <Input id="sheet-nickname" defaultValue={name} onChange={(e) => setEditName(e.target.value)} className='h-7 focus:border-none focus:outline-0 rounded-sm focus-visible:ring-[1px]' autoFocus={true} />
                            </div>
                        ) : (
                            <div className="flex gap-2 items-center">
                                <span>{icon}</span>
                                <span>{name}</span>
                            </div>
                        )
                    }
                    {editMode
                        ? (
                            <div onClick={handleUpdateName} ref={saveRef} className='w-5 h-5 flex items-center justify-center z-10'>
                                <FaSave />
                            </div>
                        ) : (
                            <span className='hidden cursor-pointer h-6 w-6 items-center justify-center' ref={optionsRef} onClick={() => setOpenDropdown(true)}><FaEllipsisH /></span>
                        )
                    }
                </div>
            </SidebarMenuButton>
            <div className={`bg-[#131313] rounded-sm w-56 absolute -right-3 top-0 translate-x-full z-20 ${openDropdown ? "" : "hidden"}`} ref={dropdownRef}>
                <div className="p-3 flex gap-2 font-medium">
                    <span>{icon}</span>
                    <span>{name}</span>
                </div>
                <div className="w-full h-[1px] bg-[#666] opacity-[0.3]"></div>
                <div className="py-3">
                    <div className="cursor-pointer px-2 mx-1 py-1 my-1 rounded-sm hover:bg-[#46464663]" onClick={changeMode}>Rename</div>
                    <div className="cursor-pointer px-2 mx-1 py-1 my-1 rounded-sm hover:bg-[#46464663] text-[#ff5269dd]" onClick={handleDelete}>Delete</div>
                </div>
            </div>
        </SidebarMenuItem>
    );
}

export default TaskGroup;