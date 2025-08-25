import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/shared/components/ui/dropdown-menu';
import React from 'react';
import { BiLogOut } from 'react-icons/bi';
import { BsChevronExpand } from 'react-icons/bs';
import { useLogout } from '../hooks/useLogout';

type UserInfoProps = {
    avatar: string,
    nickname: string | undefined,
    email: string | undefined,
    openSheet: (bool: boolean) => void
}

const UserInfo: React.FC<UserInfoProps> = ({ avatar, nickname, email, openSheet }) => {
    const logoutMutate = useLogout();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='w-full'>
                <div className="flex justify-between items-center hover:bg-accent p-4 rounded-lg cursor-pointer">
                    <div className="flex items-center gap-5">
                        <Avatar className='rounded-lg w-13 h-13'>
                            <AvatarImage src={avatar} />
                            <AvatarFallback className='rounded-lg w-13 h-13'>{nickname?.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col items-start">
                            <span className='text-sm text-ellipsis text-start overflow-hidden whitespace-nowrap w-40 max-md:w-35'>{nickname}</span>
                            <span className='text-[12px] opacity-80 text-start text-ellipsis overflow-hidden whitespace-nowrap w-40 max-md:w-35'>{email}</span>
                        </div>
                    </div>
                    <BsChevronExpand size={18} />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-50 h-45 p-4'>
                <DropdownMenuLabel className='bg-[#131313]'>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className='my-3' />
                <DropdownMenuItem className='bg-[#131313]' onClick={() => openSheet(true)}>Edit profile</DropdownMenuItem>
                <DropdownMenuItem className='bg-[#131313]' onClick={() => logoutMutate()}>
                    <div className="text-[#ff3e58dd]">Log out</div>
                    <BiLogOut color='#ff3e58dd' size={20} />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default UserInfo;