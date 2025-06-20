import React from 'react';
import Lottie from 'react-lottie'
import animationData from "@/shared/assets/lottie-json.json";

const TaskGroupInfoEmpty: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="mb-5">
                <Lottie
                    isClickToPauseDisabled={true}
                    height={200}
                    width={200}
                    options={
                        {
                            loop: true,
                            autoplay: true,
                            animationData
                        }
                    }
                />
            </div>
            <span className="text-2xl">Select task group</span>
        </div>
    );
}

export default TaskGroupInfoEmpty;