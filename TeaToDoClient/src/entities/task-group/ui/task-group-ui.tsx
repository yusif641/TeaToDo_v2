import { SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/shared/components/ui/sidebar';
import React, { useEffect, useRef, useState } from 'react';
import { FaEllipsisH, FaSave } from 'react-icons/fa';
import { useTaskGroupStore } from '../models/task-group-store';
import { useShallow } from 'zustand/react/shallow';
import { useTaskGroupTasks } from '../hooks/useTaskGroupTasks';
import { Input } from '@/shared/components/ui/input';
import EmojiPicker, { Theme, type EmojiClickData } from 'emoji-picker-react';
import { useDeleteTaskGroup } from '../hooks/useDeleteTaskGroup';
import { useUpdateTaskGroupIcon } from '../hooks/useUpdateTaskGroupIcon';
import { useUpdateTaskGroupName } from '../hooks/useUpdateTaskGroupName';

const TaskGroup: React.FC<{ icon: string, name: string, taskGroupId: string }> = ({ icon, name, taskGroupId }) => {
    const setTaskGroupSelectedId = useTaskGroupStore(useShallow(state => state.setSelectedTaskGroupId));
    const setSelectedToNull = useTaskGroupStore(useShallow(state => state.setSelectedToNull));
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
    const { deleteTaskGroup } = useDeleteTaskGroup();
    const { updateTaskGroupIcon } = useUpdateTaskGroupIcon();
    const { updateTaskGroupName } = useUpdateTaskGroupName();

    const { setOpenMobile } = useSidebar();

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

    const handleUpdateName = () => {
        updateTaskGroupName({
            taskGroupId,
            name: editName || name
        });

        setEditMode(false);
    }

    const handleRefetch = (event: React.MouseEvent) => {
        if (!optionsRef.current?.contains(event.target as Node)) {
            setTaskGroupSelectedId(taskGroupId);
            refetchTasks();

            if (window.innerWidth < 768) {
                setOpenMobile(false);
            }
        }
    }

    const changeMode = () => {
        setEditMode(true);
        setOpenDropdown(false);
    }

    const handleDelete = () => {
        setOpenDropdown(false);
        deleteTaskGroup(taskGroupId);

        if (selectedTaskGroupId == taskGroupId) {
            setSelectedToNull();
        }
    }

    const handleUpdateIcon = (emoji: EmojiClickData) => {
        setEmojiPickerOpen(false);

        updateTaskGroupIcon({
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
                                <div className="fixed translate-x-[85%] max-sm:translate-x-0 top-20 z-20" ref={emojiRef}>
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
                                <span className='text-ellipsis overflow-hidden whitespace-nowrap w-50'>{name}</span>
                            </div>
                        )
                    }
                    {editMode
                        ? (
                            <div onClick={handleUpdateName} ref={saveRef} className='w-5 h-5 flex items-center justify-center z-10'>
                                <FaSave />
                            </div>
                        ) : (
                            <span className='hidden max-md:flex cursor-pointer h-6 w-6 items-center justify-center' ref={optionsRef} onClick={() => setOpenDropdown(true)}><FaEllipsisH /></span>
                        )
                    }
                </div>
            </SidebarMenuButton>
            <div className={`bg-[#131313] rounded-sm w-56 fixed translate-x-[138%] max-md:translate-x-[128%] max-sm:translate-x-0 top-20 border-1 border-neutral-800 z-20 ${openDropdown ? "" : "hidden"}`} ref={dropdownRef}>
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