import React, { useEffect, useState } from "react";
import axios from "axios";
import TeacherCard from './card/TeacherCard';
import { useSelector } from "react-redux";
import { Button } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TeacherRegistrationForm from '../components/form/TeacherRegistrationForm';

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const { username } = useSelector((state) => state.login);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/teachers");
        setTeachers(response.data.Items); 
      } catch (error) {
        console.error("Error fetching teacher data:", error);
      }
    };
    fetchData();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <h1 className="text-center text-2xl mb-4">Teacher List</h1>
      {username && (
        <div className="flex justify-start mb-4 pl-5">
          <button 
           className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={handleClickOpen}>
            Add Teacher
          </button>
        </div>
      )}
      <div className="flex flex-row flex-wrap justify-center items-center gap-[20px] m-10">
        {teachers.map((teacher, index) => (
          <TeacherCard key={index} name={teacher.name} phone={teacher.phone} photo={`../../public/image/${teacher?.photo}`} designation={teacher.designation} />
        ))}
      </div>

      <TeacherRegistrationForm open={open} handleClose={handleClose} />
      <ToastContainer />
    </>
  );
};

export default TeacherList;
