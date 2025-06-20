import React from 'react';
import { BsChevronExpand } from 'react-icons/bs';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import avatar from "@/shared/assets/test/avatar.jpg";

const User: React.FC = () => {
    return (
        <div className="flex justify-between items-center hover:bg-accent p-4 rounded-lg cursor-pointer">
            <div className="flex items-center gap-5">
                <Avatar className='rounded-lg w-10 h-10'>
                    <AvatarImage src={avatar} />
                    <AvatarFallback>LG</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className='text-sm'>Legend</span>
                    <span className='text-sm'>gorc141408@gmail.com</span>
                </div>
            </div>
            <BsChevronExpand size={18} />
        </div>
    );
}

export default User;