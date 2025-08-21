import { useCreateQuote } from '@/entities/quote';
import { useCreateTask } from '@/entities/task';
import { useTaskGroupStore } from '@/entities/task-group';
import { Input } from '@/shared/components/ui/input'
import { cn } from '@/shared/lib/utils';
import React, { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useShallow } from 'zustand/react/shallow';

const CreateTaskInput: React.FC = () => {
    const [taskText, setTaskText] = useState("");
    const [openDropdown, setOpenDropdown] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const taskGroupId = useTaskGroupStore(useShallow(state => state.selectedTaskGroupId));

    const { createTask } = useCreateTask(taskGroupId!);
    const { createQuote } = useCreateQuote(taskGroupId!);

    useEffect(() => {
        const handleClickOutside = (event: React.TouchEvent | MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && event.target !== dropdownRef.current) {
                setOpenDropdown(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [dropdownRef]);

    const handleCreateQuote = () => {
        createQuote({
            taskGroupId: taskGroupId!,
            text: "Write quote text here"
        });

        setOpenDropdown(false);
    }

    const handleCreateTask = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            createTask({
                taskGroupId: taskGroupId!,
                text: taskText
            })

            setTaskText("");
        }
    }

    return (
        <div className="flex gap-3 items-center w-full max-w-130 -translate-y-4 -translate-x-7 hover:[&_span]:opacity-100">
            <span className='opacity-0 w-3 cursor-pointer transition-all duration-200' onClick={() => setOpenDropdown(true)}>
                <FaPlus size={13} className='' />
            </span>
            <Input
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                onKeyDown={handleCreateTask}
                placeholder='Write task text, then press enter'
                className='border-none focus-visible:ring-none focus-visible:ring-[0px] focus:border-1 focus:border-neutral-800'
                autoFocus={true}
            />
            <div
                className={cn(
                    `bg-[#131313] -left-3 rounded-sm w-56 absolute -top-10 -translate-x-full`,
                    `z-20 border-neutral-800 border-1 opacity-0 transition-all duration-200`,
                    `${openDropdown ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`
                )}
                ref={dropdownRef}
            >
                <div className="p-3 flex gap-2 font-medium">Create</div>
                <div className="w-full h-[1px] bg-[#666] opacity-[0.3]"></div>
                <div className="py-3">
                    <div className="cursor-pointer px-2 mx-1 py-1 rounded-sm hover:bg-[#46464663]">Full task</div>
                    <div className="cursor-pointer px-2 mx-1 py-1 rounded-sm hover:bg-[#46464663]" onClick={handleCreateQuote}>Quote</div>
                    <div className="cursor-pointer px-2 mx-1 py-1 rounded-sm hover:bg-[#46464663]">Thought</div>
                </div>
            </div>
        </div>
    )
}

export default CreateTaskInput