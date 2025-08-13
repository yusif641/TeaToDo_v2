import React, { useEffect, useState } from 'react';
import { useUser } from '../hooks/useUser';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/shared/components/ui/sheet';
import { Button } from '@/shared/components/ui/button';
import { HOST_URL } from '@/shared/utils/constants';
import { ToastContainer } from 'react-toastify';
import UserInfo from './user-info';
import UserOptions from './user-options';

const User: React.FC = () => {
    const [sheetOpen, setSheetOpen] = useState(false);
    const [nickname, setNickname] = useState("");
    const [image, setImage] = useState("");

    const { data } = useUser();

    useEffect(() => {
        setNickname(data?.nickname || "");

        if (data?.avatar_url) {
            setImage(`${HOST_URL}/${data.avatar_url}`);
        } else {
            setImage("");
        }
    }, [data]);

    return (
        <div>
            <ToastContainer theme='black' position='bottom-right' />
            <UserInfo email={data?.email} nickname={data?.nickname} avatar={image} openSheet={setSheetOpen} />
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Edit profile</SheetTitle>
                        <SheetDescription>
                            Make changes to your profile here. Click save when you&apos;re done.
                        </SheetDescription>
                    </SheetHeader>
                    <UserOptions inputNickname={nickname} userNickname={data?.nickname} image={image} openSheet={setSheetOpen} setNickname={setNickname} />
                    <SheetFooter>
                        <SheetClose asChild>
                            <Button className='cursor-pointer' variant="outline">Close</Button>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    );
}

export default User;