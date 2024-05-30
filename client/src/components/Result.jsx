import React, { useEffect, useState } from 'react';
import NoticeCard from '../components/card/NoticeCard'; // Assuming you have a NoticeCard component
import axios from 'axios';

const Result = () => {
    const [notices, setNotices] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:3000/result");
          setNotices(response.data.Items); 
          console.log(notices[0].pdf)
         
        } catch (error) {
          console.error("Error fetching notices data:", error);
        }
      };
      fetchData();
    }, []);
    return (
        <div className="flex flex-col justify-center items-center ">
            <h1 className="text-3xl text-center mt-8 mb-4">Result Board</h1>
            <div className="flex flex-col w-2/3 ">
                {notices.map((notice, index) => (
                    <NoticeCard
                        key={index}
                        pdf={`../../public/image/${notice.pdf}`}
                        description={notice.description}
                        date={notice.id}
                    />
                ))}
            </div>
        </div>
    );
};

export default Result;
