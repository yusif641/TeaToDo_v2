import { cn } from '@/shared/lib/utils';
import React, { useCallback, useEffect, useRef, useState, type ChangeEvent } from 'react';
import { FaGripVertical } from 'react-icons/fa';
import { useDeleteThought } from '../hooks/useDeleteThought';
import { useTaskGroupStore } from '@/entities/task-group';
import { useShallow } from 'zustand/react/shallow';
import { AutosizeTextarea } from '@/shared/components/ui/autosized-textarea';
import { useUpdateThoughtText } from '../hooks/useUpdateThoughtText';
import debounce from 'lodash.debounce';
import EmojiPicker, { Theme, type EmojiClickData } from 'emoji-picker-react';
import { useUpdateThoughtIcon } from '../hooks/useUpdateThoughtIcon';

const Thought: React.FC<{ emoji: string, text: string, thoughtId: string }> = ({ emoji, text, thoughtId }) => {
    const [openDropdown, setOpenDropdown] = useState(false);
    const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
    const [thoughtText, setThoughtText] = useState(text);

    const selectedId = useTaskGroupStore(useShallow(state => state.selectedTaskGroupId));

    const emojiRef = useRef<HTMLDivElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null);

    const { deleteThought } = useDeleteThought(selectedId!);
    const { updateThoughtText } = useUpdateThoughtText(selectedId!);
    const { updateThoughtIcon } = useUpdateThoughtIcon(selectedId!);

    useEffect(() => {
        const handleClickOutside = (event: React.TouchEvent | MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && event.target !== dropdownRef.current) {
                setOpenDropdown(false);
            }

            if (emojiRef.current && !emojiRef.current.contains(event.target as Node)) {
                setEmojiPickerOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [dropdownRef, emojiRef]);

    const handleDeleteThought = () => {
        deleteThought(thoughtId);
        setOpenDropdown(false);
    }

    const handleUpdateText = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setThoughtText(event.target.value);
        debounceUpdateText(event.target.value);
    }

    const debounceUpdateText = useCallback(
        debounce((text: string) => {
            updateThoughtText({
                thoughtId,
                text
            })
        }, 700), []
    )

    const handleUpdateIcon = (emoji: EmojiClickData) => { 
        updateThoughtIcon({
            thoughtId,
            emoji: emoji.emoji
        });

        setEmojiPickerOpen(false);
    }

    return (
        <div className="mb-3 hover:[&_span]:opacity-100 relative flex items-start -translate-x-6">
            <span className="flex items-center mt-2 gap-2 mr-3 opacity-0 transition-all duration-200" onClick={() => setOpenDropdown(true)}>
                <FaGripVertical size={13} className='cursor-pointer' />
            </span>
            <div className="bg-[#171717] p-3 rounded-sm w-full relative">
                <div
                    className={cn(
                        "hover:bg-[#44444421] rounded-sm p-1 hover:border-1 w-8 flex items-center",
                        "justify-center h-8 cursor-pointer mb-2 text-xl -ml-1 transition-all duration-100"
                    )}
                    onClick={() => setEmojiPickerOpen(true)}
                >{emoji}</div>
                <div className="absolute bottom-0 -left-2 -translate-x-full z-20" ref={emojiRef}>
                    <EmojiPicker
                        theme={Theme.DARK}
                        open={emojiPickerOpen}
                        onEmojiClick={handleUpdateIcon}
                        autoFocusSearch={false}
                    />
                </div>
                <AutosizeTextarea
                    value={thoughtText}
                    onChange={handleUpdateText}
                    className={`border-none`}
                />
            </div>
            <div
                className={cn(
                    `bg-[#131313] -left-3 rounded-sm w-56 absolute -top-10 -translate-x-full`,
                    `z-20 border-neutral-800 border-1 opacity-0 transition-all duration-200`,
                    `${openDropdown ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`
                )}
                ref={dropdownRef}
            >
                <div className="p-3 flex gap-2 font-medium">Thought</div>
                <div className="w-full h-[1px] bg-[#666] opacity-[0.3]"></div>
                <div className="py-3">
                    <div className="cursor-pointer px-2 mx-1 py-1 rounded-sm hover:bg-[#46464663] text-[#ff5269dd]" onClick={handleDeleteThought}>Delete</div>
                </div>
            </div>
        </div>
    );
}

export default Thought;