import React from 'react';
import { useSelector } from 'react-redux';
const Check = () => {
    const allTodo = useSelector((state)=>state.login);
    console.log(allTodo)
    return (
        <div>
        </div>
    );
};

export default Check;