import React, { useEffect, useRef, useState } from 'react';
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
import { TaskGroup, useTaskGroups } from '@/entities/task-group';
import { User } from '@/entities/user';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
import { Label } from '@/shared/components/ui/label';
import { Input } from '@/shared/components/ui/input';
import EmojiPicker, { Theme, type EmojiClickData } from "emoji-picker-react";
import { useMutation } from '@tanstack/react-query';
import { taskGroupApi } from '@/entities/task-group/api/task-group-api';
import { queryClient } from '@/app/providers/queryClient';
import type { ErrorResponse, ValidationErrorResponce } from '@/shared/api/api';
import { toast } from 'react-toastify';

const HomeSidebar: React.FC = () => {
    const [emojiPickerOpen, setEmojiPickerOpen] = useState(false)
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [name, setName] = useState("New Task Group");
    const [icon, setIcon] = useState("🍺");

    const { taskGroupsData, taskGroupsPending } = useTaskGroups();

    const emojiRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: React.TouchEvent | MouseEvent) => {
            if (emojiRef.current && !emojiRef.current.contains(event.target as Node)) {
                setEmojiPickerOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [emojiRef]);

    const createTaskGroupMutation = useMutation({
        mutationKey: [taskGroupApi.baseKey, "create"],
        mutationFn: taskGroupApi.createTaskGroup,
        onError: (error) => {
            const data = (error as ErrorResponse).response.data;

            if ((data.errors as ValidationErrorResponce).details) {
                toast.error((data.errors as ValidationErrorResponce).details[0].message);
            } else {
                toast.error(data.message);
            }
        },
        onSuccess: () => {
            toast.success("Task Group Created");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [taskGroupApi.baseKey] });
        }
    });

    const handleAddEmoji = (emoji: EmojiClickData) => {
        setIcon(emoji.emoji);
        setEmojiPickerOpen(false);
    }

    const handleCreateTaskGroup = () => {
        createTaskGroupMutation.mutate({
            icon,
            name
        });

        setName("New Task Group");
        setIcon("🍺");
        setOpenCreateDialog(false);
    }

    return (
        <Sidebar>
            <SidebarHeader className='pt-4 pr-4 pl-4'>
                <div className="flex justify-between items-center">
                    <span className='text-sm text-[#B0AFA9]'>Workspace</span>
                    <div title='Add Task Group' className='cursor-pointer' onClick={() => setOpenCreateDialog(true)}>
                        <FaPlus size={14} className='third-color' />
                    </div>
                </div>
                <Dialog open={openCreateDialog} onOpenChange={() => setOpenCreateDialog((false))}>
                    <DialogContent className="sm:max-w-[425px]">
                        <div className="absolute top-0 left-0 -translate-x-90 -translate-y-25" ref={emojiRef}>
                            <EmojiPicker
                                theme={Theme.DARK}
                                open={emojiPickerOpen}
                                onEmojiClick={handleAddEmoji}
                                autoFocusSearch={false}
                            />
                        </div>
                        <DialogHeader className='mb-3'>
                            <DialogTitle>Create new task group</DialogTitle>
                            <DialogDescription>
                                Select icon and write name to create new task group where you can
                                organize your tasks
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="taskGroupName">Task Group Name</Label>
                                <div className="flex items-center gap-2">
                                    <div
                                        onClick={() => setEmojiPickerOpen((true))}
                                        className="text-lg bg-[#44444421] rounded-sm p-1 border-1 w-10 flex items-center justify-center h-9 cursor-pointer"
                                    >{icon}</div>
                                    <Input id="taskGroupName" name="taskGroupName" defaultValue={name} value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline" className='cursor-pointer'>Cancel</Button>
                            </DialogClose>
                            <Button type="submit" className='cursor-pointer' onClick={handleCreateTaskGroup}>Create</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
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
                                        banner={taskGroup.background_url}
                                    />)
                            ))}
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