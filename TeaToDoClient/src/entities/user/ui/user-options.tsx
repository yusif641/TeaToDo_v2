import { AvatarFallback, AvatarImage, Avatar } from '@/shared/components/ui/avatar';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import React, { useRef, useState, type ChangeEvent } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { useUpdateAvatar } from '../hooks/useUpdateAvatar';
import { useDeleteAvatar } from '../hooks/useDeleteAvatar';
import { useNickname } from '../hooks/useNickname';

type UserOptionProps = {
    inputNickname: string,
    setNickname: (nickname: string) => void,
    userNickname: string | undefined,
    image: string,
    openSheet: (bool: boolean) => void
}

const UserOptions: React.FC<UserOptionProps> = ({ inputNickname, setNickname, userNickname, image, openSheet }) => {
    const [hovered, setHovered] = useState(false);

    const handleDeleteAvatar = () => deleteAvatar();
    const selectFile = () => fileInputRef.current?.click();

    const { mutateNickname, isNicknamePending } = useNickname();
    const { updateAvatar } = useUpdateAvatar();
    const { deleteAvatar } = useDeleteAvatar();

    const fileInputRef = useRef<HTMLInputElement>(null);

    const updateUserNickname = () => {
        mutateNickname({
            nickname: inputNickname
        });

        openSheet(false);
    }

    const handleAvatarUpdate = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;

        if (file) {
            const formData = new FormData();
            formData.append('avatar', file);

            updateAvatar(formData);
        }
    }

    return (
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <div className="grid gap-3">
                <Label>Avatar</Label>
                <div className="flex items-center justify-between">
                    <Avatar
                        className='rounded-full w-30 h-30 relative cursor-pointer'
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                    >
                        {hovered && (
                            <div className="absolute w-30 h-30 top-0 left-0 inset-0 flex items-center justify-center bg-black/50 ring-fuchsia-50 rounded-full" onClick={image ? handleDeleteAvatar : selectFile}>
                                {image ? <FaTrash /> : <FaPlus size={20} />}
                            </div>
                        )}
                        <AvatarImage src={image} />
                        <AvatarFallback className='rounded-full w-30 h-30 text-3xl'>{userNickname?.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                </div>
                <input type="file" ref={fileInputRef} onChange={(e) => handleAvatarUpdate(e)} className='hidden' name='avatar' accept='.png, .jpg, .jpeg, .svg, .webp' />
            </div>
            <div className="grid gap-3">
                <Label htmlFor="sheet-nickname">Nickname</Label>
                <div className="flex items-center gap-3">
                    <Input id="sheet-nickname" defaultValue={inputNickname || userNickname} onChange={(e) => setNickname(e.target.value)} />
                    <Button className={`cursor-pointer ${isNicknamePending && "opacity-50"}`} onClick={updateUserNickname} disabled={isNicknamePending}>Save</Button>
                </div>
            </div>
        </div>
    );
}

export default UserOptions;