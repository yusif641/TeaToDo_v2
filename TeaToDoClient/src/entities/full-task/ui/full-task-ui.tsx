import { cn } from '@/shared/lib/utils';
import React, { useCallback, useEffect, useRef, useState, type ChangeEvent } from 'react';
import { FaGripVertical } from 'react-icons/fa';
import { useDeleteFullTask } from '../hooks/useDeleteFullTask';
import { useTaskGroupStore } from '@/entities/task-group';
import { useShallow } from 'zustand/react/shallow';
import type { FullTaskState } from '../api/fullTasksApi';
import { useUpdateFullTaskState } from '../hooks/useUpdateFullTaskState';
import { useUpdateFullTaskName } from '../hooks/useUpdateFullTaskName';
import debounce from 'lodash.debounce';
import { useUpdateFullTaskText } from '../hooks/useUpdateFullTaskText';
import { AutosizeTextarea } from '@/shared/components/ui/autosized-textarea';

type FullTaskProps = {
    name: string,
    text: string,
    state: FullTaskState,
    fullTaskId: string
}

const FullTask: React.FC<FullTaskProps> = ({ name, text, state, fullTaskId }) => {
    const [openDropdown, setOpenDropdown] = useState(false);
    const [taskName, setTaskName] = useState(name);
    const [taskText, setTaskText] = useState(text);

    const selectedId = useTaskGroupStore(useShallow(state => state.selectedTaskGroupId));
    const dropdownRef = useRef<HTMLDivElement>(null);

    const { deleteFullTask } = useDeleteFullTask(selectedId!);
    const { updateFullTaskState } = useUpdateFullTaskState(selectedId!);
    const { updateFullTaskName } = useUpdateFullTaskName(selectedId!);
    const { updateFullTaskText } = useUpdateFullTaskText(selectedId!);

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

    const handleDeleteFullTask = () => {
        deleteFullTask(fullTaskId);
        setOpenDropdown(false);
    }

    const handleSetState = (updateState: FullTaskState) => {
        let newState: FullTaskState = state === updateState ? "inProgress" : updateState;

        updateFullTaskState({
            fullTaskId,
            state: newState
        });

        setOpenDropdown(false);
    }

    const handleUpdateName = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setTaskName(event.target.value);
        debounceUpdateName(event.target.value);
    }

    const debounceUpdateName = useCallback(
        debounce((name: string) => {
            updateFullTaskName({
                fullTaskId,
                name
            })
        }, 700), []
    )

    const handleUpdateText = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setTaskText(event.target.value);
        debounceUpdateText(event.target.value);
    }

    const debounceUpdateText = useCallback(
        debounce((text: string) => {
            updateFullTaskText({
                fullTaskId,
                text
            })
        }, 700), []
    )

    return (
        <div className='relative'>
            <div
                className={cn(
                    `bg-[#131313] -left-3 rounded-sm w-56 absolute -top-10 -translate-x-full`,
                    `z-40 border-neutral-800 border-1 opacity-0 transition-all duration-200 max-2xl:translate-x-0`,
                    `${openDropdown ? "opacity-100 pointer-events-auto block" : "opacity-0 pointer-events-none hidden z-20"}`
                )}
                ref={dropdownRef}
            >
                <div className="p-3 flex gap-2 font-medium">Full task</div>
                <div className="w-full h-[1px] bg-[#666] opacity-[0.3]"></div>
                <div className="py-3">
                    <div className="cursor-pointer px-2 mx-1 py-1 rounded-sm hover:bg-[#46464663]" onClick={() => handleSetState("completed")}>Mark as completed</div>
                    <div className="cursor-pointer px-2 mx-1 py-1 rounded-sm hover:bg-[#46464663]" onClick={() => handleSetState("marked")}>Mark</div>
                </div>
                <div className="w-full h-[1px] bg-[#666] opacity-[0.3]"></div>
                <div className="py-3">
                    <div className="cursor-pointer px-2 mx-1 py-1 rounded-sm hover:bg-[#46464663] text-[#ff5269dd]" onClick={handleDeleteFullTask}>Delete</div>
                </div>
            </div>
            <div className="mb-3 hover:[&_span]:opacity-100 flex items-start -translate-x-6 max-md:-translate-x-2 relative">
                <span className="flex items-center mt-1 gap-2 mr-3 opacity-0 transition-all duration-200 max-md:opacity-100" onClick={() => setOpenDropdown(true)}>
                    <FaGripVertical size={13} className='cursor-pointer' />
                </span>
                <input type="checkbox" className={`checkbox ${state === "marked" && "marked"}`} checked={state === "completed"} onChange={() => handleSetState("completed")} />
                <div className="w-full relative">
                    <div className="bg-[#171717] p-3 rounded-sm fullTask -mt-1 w-full">
                        <div className='w-full'>
                            <AutosizeTextarea value={taskName} onChange={handleUpdateName} className={`w-full text-md mb-3 focus:border-none outline-none ${state === "completed" && "line-through italic"} ${state === "marked" && "text-[#ffbb6ddd] font-bold"}`} />
                        </div>
                        <AutosizeTextarea
                            value={taskText}
                            onChange={handleUpdateText}
                            className={`border-none text-sm ${state === "completed" && "line-through italic"} ${state === "marked" && "text-[#ffbb6ddd] font-bold"}`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FullTask;