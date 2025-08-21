import { cn } from '@/shared/lib/utils';
import React, { useCallback, useEffect, useRef, useState, type ChangeEvent } from 'react';
import { FaGripVertical } from 'react-icons/fa';
import { type TaskState } from '../api/tasks-api';
import { useTaskGroupStore } from '@/entities/task-group';
import { useShallow } from 'zustand/react/shallow';
import debounce from "lodash.debounce";
import { useDeleteTask } from '../hooks/useDeleteTask';
import { useUpdateTaskState } from '../hooks/useUpdateTaskState';
import { useUpdateTaskText } from '../hooks/useUpdateTaskText';

type TaskProps = {
    text: string,
    taskId: string,
    state: TaskState
}

const Task: React.FC<TaskProps> = ({ text, taskId, state }) => {
    const [openDropdown, setOpenDropdown] = useState(false);
    const [taskText, setTaskText] = useState(text);

    const selectedId = useTaskGroupStore(useShallow(state => state.selectedTaskGroupId));
    const dropdownRef = useRef<HTMLDivElement>(null);

    const { deleteTask } = useDeleteTask(selectedId!);
    const { updateTaskState } = useUpdateTaskState(selectedId!);
    const { updateTaskText } = useUpdateTaskText(selectedId!);

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

    const handleDeleteTask = () => {
        deleteTask(taskId);
        setOpenDropdown(false);
    }

    const handleUpdateText = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskText(event.target.value);
        debounceUpdate(event.target.value);
    }

    const debounceUpdate = useCallback(
        debounce((text: string) => {
            updateTaskText({
                taskId,
                text
            })
        }, 700), []
    )

    const handleSetState = (updateState: TaskState) => {
        let newState: TaskState = state === updateState ? "inProgress" : updateState;

        updateTaskState({
            taskId,
            state: newState
        });

        setOpenDropdown(false);
    }

    return (
        <div className="flex items-center mb-3 -translate-x-6 hover:[&_span]:opacity-100 relative">
            <span className="flex items-center gap-2 mr-3 opacity-0 transition-all duration-200" onClick={() => setOpenDropdown(true)}>
                <FaGripVertical size={13} className='cursor-pointer' />
            </span>
            <input type="checkbox" className={`checkbox ${state === "marked" && "marked"}`} checked={state === "completed"} onChange={() => handleSetState("completed")} />
            <div className='w-full'>
                <input value={taskText} onChange={handleUpdateText} className={`w-full text-md focus:border-none outline-none ${state === "completed" && "line-through italic"} ${state === "marked" && "text-[#ffbb6ddd] font-bold"}`} />
            </div>
            <div
                className={cn(
                    `bg-[#131313] -left-3 rounded-sm w-56 absolute -top-10 -translate-x-full`,
                    `z-20 border-neutral-800 border-1 opacity-0 transition-all duration-200`,
                    `${openDropdown ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`
                )}
                ref={dropdownRef}
            >
                <div className="p-3 flex gap-2 font-medium">Task</div>
                <div className="w-full h-[1px] bg-[#666] opacity-[0.3]"></div>
                <div className="py-3">
                    <div className="cursor-pointer px-2 mx-1 py-1 rounded-sm hover:bg-[#46464663]" onClick={() => handleSetState("completed")}>Mark as completed</div>
                    <div className="cursor-pointer px-2 mx-1 py-1 rounded-sm hover:bg-[#46464663]" onClick={() => handleSetState("marked")}>Mark</div>
                </div>
                <div className="w-full h-[1px] bg-[#666] opacity-[0.3]"></div>
                <div className="py-3">
                    <div className="cursor-pointer px-2 mx-1 py-1 rounded-sm hover:bg-[#46464663] text-[#ff5269dd]" onClick={handleDeleteTask}>Delete</div>
                </div>
            </div>
        </div>
    );
}

export default Task;