import React from 'react';

const NoticeCard = ({ pdf, description,date }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg mb-5 ">
            <div className="p-4 flex flex-row justify-between">
                <h1 className="text-lg mb-2 font-bold">{description}</h1>
                <h1 className='ml-auto mr-5'>{date}</h1>
                <a href={pdf} className="text-blue-500 underline hover:text-blue-700">PDF</a>
            </div>
        </div>
    );
};

export default NoticeCard;
