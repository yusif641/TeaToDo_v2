import React from 'react';
import loading from "@/shared/assets/gifs/loading.gif";

const Loader: React.FC = () => {
    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="">
                <img src={loading} alt="" />
                <p className="text-center font-bold text-2xl">Launching app...</p>
            </div>
        </div>
    );
}

export default Loader;