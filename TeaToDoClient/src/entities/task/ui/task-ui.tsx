import React from 'react';

const Task: React.FC<{ text: string }> = ({ text }) => {
    return (
        <div className="flex items-center mb-3">
            <input type="checkbox" name="" id="" className='checkbox' />
            <div className='text-md'>{text}</div>
        </div>
    );
}

export default Task;