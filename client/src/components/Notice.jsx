import React, { useEffect, useState } from 'react';
import NoticeCard from '../components/card/NoticeCard'; // Assuming you have a NoticeCard component
import axios from 'axios';
import { useSelector } from 'react-redux';
import NoticeCreateForm from '../components/form/NoticeCreateForm'; // Adjust the path if necessary
import { Button } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const { username } = useSelector((state) => state.login);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/notices");
        setNotices(response.data.Items);
      } catch (error) {
        console.error("Error fetching notices data:", error);
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
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl text-center mt-8 mb-4">Notice Board</h1>
      {username && (
        <div className="flex justify-start mb-4 pl-5 ">
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Add Notice
          </Button>
        </div>
      )}
      <div className="flex flex-col w-2/3">
        {notices.map((notice, index) => (
          <NoticeCard
            key={index}
            pdf={`../../public/image/${notice.pdf}`}
            description={notice.description}
            date={notice.id}
          />
        ))}
      </div>
      <NoticeCreateForm open={open} handleClose={handleClose} />
      <ToastContainer />
    </div>
  );
};

export default Notice;
