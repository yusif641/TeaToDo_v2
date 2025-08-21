import { cn } from '@/shared/lib/utils';
import React, { useCallback, useEffect, useRef, useState, type ChangeEvent } from 'react';
import { FaGripVertical } from 'react-icons/fa';
import { useTaskGroupStore } from '@/entities/task-group';
import { useShallow } from 'zustand/react/shallow';
import { useDeleteQuote } from '../hooks/useDeleteQuote';
import { AutosizeTextarea } from '@/shared/components/ui/autosized-textarea';
import debounce from 'lodash.debounce';
import { useUpdateQuoteText } from '../hooks/useUpdateQuoteText';

const Quote: React.FC<{ text: string, quoteId: string }> = ({ text, quoteId }) => {
    const [openDropdown, setOpenDropdown] = useState(false);
    const [quoteText, setQuoteText] = useState(text);

    const selectedId = useTaskGroupStore(useShallow(state => state.selectedTaskGroupId));
    const dropdownRef = useRef<HTMLDivElement>(null);

    const { deleteQuote } = useDeleteQuote(selectedId!);
    const { updateQuoteText } = useUpdateQuoteText(selectedId!);

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

    const handleDeleteQuote = () => {
        deleteQuote(quoteId);
        setOpenDropdown(false);
    }

    const handleUpdateText = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setQuoteText(event.target.value);
        debounceUpdate(event.target.value);
    }

    const debounceUpdate = useCallback(
        debounce((text: string) => {
            updateQuoteText({
                quoteId,
                text
            })
        }, 700), []
    )

    return (
        <div className="flex items-center mb-3 -translate-x-6 hover:[&_span]:opacity-100 relative">
            <span className="flex items-center gap-2 mr-3 opacity-0 transition-all duration-200" onClick={() => setOpenDropdown(true)}>
                <FaGripVertical size={13} className='cursor-pointer' />
            </span>
            <div className="py-2 italic border-l-5 w-full">
                <AutosizeTextarea value={quoteText} onChange={handleUpdateText} className='pl-4 border-none' />
            </div>
            <div
                className={cn(
                    `bg-[#131313] -left-3 rounded-sm w-56 absolute -top-10 -translate-x-full`,
                    `z-20 border-neutral-800 border-1 opacity-0 transition-all duration-200`,
                    `${openDropdown ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`
                )}
                ref={dropdownRef}
            >
                <div className="p-3 flex gap-2 font-medium">Quote</div>
                <div className="w-full h-[1px] bg-[#666] opacity-[0.3]"></div>
                <div className="py-3">
                    <div className="cursor-pointer px-2 mx-1 py-1 rounded-sm hover:bg-[#46464663] text-[#ff5269dd]" onClick={handleDeleteQuote}>Delete</div>
                </div>
            </div>
        </div>
    );
}

export default Quote;