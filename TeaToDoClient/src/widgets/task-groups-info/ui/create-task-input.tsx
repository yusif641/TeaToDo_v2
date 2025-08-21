import { useCreateTask } from '@/entities/task';
import { useTaskGroupStore } from '@/entities/task-group';
import { Input } from '@/shared/components/ui/input'
import React, { useState, type KeyboardEvent } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useShallow } from 'zustand/react/shallow';

const CreateTaskInput: React.FC = () => {
    const [taskText, setTaskText] = useState("");
    const taskGroupId = useTaskGroupStore(useShallow(state => state.selectedTaskGroupId));

    const { createTask } = useCreateTask(taskGroupId!);

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
            <span className='opacity-0 w-3 cursor-pointer transition-all duration-200'>
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
        </div>
    )
}

export default CreateTaskInput