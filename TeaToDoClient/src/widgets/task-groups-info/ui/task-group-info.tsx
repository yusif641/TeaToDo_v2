import React from 'react';
import banner from "@/shared/assets/test/banner.png";
import { Task } from '@/entities/task';
import { FullTask } from '@/entities/full-task';
import Quote from '@/entities/quote/ui/quote-ui';
import { Thought } from '@/entities/thought';

const TaskGroupInfo: React.FC = () => {
    return (
        <div className=''>
            <div className="-z-3 w-full max-h-40 overflow-hidden">
                <img src={banner} className='w-full translate-y-[-50%]' alt="" />
            </div>
            <div className="flex flex-col items-center">
                <div className="w-200">
                    <div className="-translate-y-8 mb-4">
                        <div className='text-7xl -ml-4'>❤️‍🔥</div>
                        <div className='text-5xl font-bold mt-7'>TaskGroup</div>
                    </div>
                    <div className="">
                        <Task />
                        <FullTask />
                        <Quote />
                        <Thought />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaskGroupInfo;