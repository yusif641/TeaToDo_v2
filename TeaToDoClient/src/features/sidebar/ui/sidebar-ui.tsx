import React, { useEffect, useRef, useState } from 'react';
import {
    Sidebar,
    SidebarFooter,
    SidebarHeader,
} from '@/shared/components/ui/sidebar';
import { FaPlus } from 'react-icons/fa';
import { useCreateTaskGroup } from '@/entities/task-group';
import { User } from '@/entities/user';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
import { Label } from '@/shared/components/ui/label';
import { Input } from '@/shared/components/ui/input';
import EmojiPicker, { Theme, type EmojiClickData } from "emoji-picker-react";
import SidebarContentUI from './sidebar-content';

const HomeSidebar: React.FC = () => {
    const [emojiPickerOpen, setEmojiPickerOpen] = useState(false)
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [name, setName] = useState("New Task Group");
    const [icon, setIcon] = useState("🍺");

    const { createTaskGroup } = useCreateTaskGroup();

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

    const handleAddEmoji = (emoji: EmojiClickData) => {
        setIcon(emoji.emoji);
        setEmojiPickerOpen(false);
    }

    const handleCreateTaskGroup = () => {
        createTaskGroup.mutate({
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
                        <div className="fixed top-0 left-0 -translate-x-90 -translate-y-25 max-xl:translate-x-0 max-xl:left-30 max-sm:left-[50vw] max-sm:-translate-x-[55%] z-20" ref={emojiRef}>
                            <EmojiPicker
                                theme={Theme.DARK}
                                open={emojiPickerOpen}
                                onEmojiClick={handleAddEmoji}
                                autoFocusSearch={false}
                                width={300}
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
            <SidebarContentUI />
            <SidebarFooter>
                <User />
            </SidebarFooter>
        </Sidebar>
    );
}

export default HomeSidebar;