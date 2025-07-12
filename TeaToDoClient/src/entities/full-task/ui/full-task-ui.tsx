import React from 'react';

const FullTask: React.FC = () => {
    return (
        <div className="mb-3">
            <input type="checkbox" name="" id="" className='checkbox' />
            <div className="">
                <div className="bg-[#171717] p-3 rounded-sm fullTask">
                    <div className='text-md mb-3'>New task</div>
                    <p className="text-sm">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis nam adipisci, veniam, voluptatem doloremque rem magni
                        accusamus recusandae, sed voluptas odio eveniet voluptatibus? Eaque numquam possimus nisi? Quod, rerum commodi!
                    </p>
                </div>
            </div>
        </div>
    );
}

export default FullTask;