import React, { useState } from 'react';
import { axios } from 'axios';

const StudentDetails = ({Class,id}) => {
    const [data,setData] = useState();
    const fetchData = async()=>{
        const  res = await axios.get('http://localhost:3000/students/${Class}/${id}');
        setData(res.data.Items);
    }
    return (
        <div>
             <h1>{data?.name}</h1>
        </div>
    );
};

export default StudentDetails;