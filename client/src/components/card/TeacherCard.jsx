import React from 'react';
import axios from "axios";
import  { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import TeacherUpdateForm from '../form/TeacherUpdateForm';

const TeacherCard = ({ phone, name, designation,photo }) => {

    const { username, token } = useSelector((state) => state.login);
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
    
    const handleDelete = async (e) => {
        try {
          const response = await axios.delete(
            `http://localhost:3000/teachers/${phone}`,
            {
              headers: {
                Authorization: `${token}`,
              },
            }
          );
          console.log("Response:", response.data);
          toast.success(response.data);
        } catch (error) {
          console.error("Error:", error);
          toast.error("Delete failed. Please try again.");
        }
      };
    
      const handleUpdateDialogOpen = () => {
        setOpenUpdateDialog(true);
      };
    
      const handleUpdateDialogClose = () => {
        setOpenUpdateDialog(false);
      };

    return (
        <>
        <div className="w-[90%]  sm:w-[40%] lg:w-[20%] rounded-lg shadow-lg shadow-slate-300 ">
            <img src={photo} alt="photo" className="w-full rounded-md mb-4 h-[250px]" />
            <div className='flex flex-col justify-center items-center'>
            <h2>phone: {phone}</h2>
            <h2 className="text-xl font-semibold">Name : {name}</h2>
            <p className="text-gray-600">designation: {designation}</p>
            </div>
            {username && (
          <div className="flex flex-row justify-center gap-2 mb-2">
            <button
              className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={handleUpdateDialogOpen}
            >
              Update
            </button>
            <button
              className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        )}
        </div>
        <TeacherUpdateForm
        open={openUpdateDialog}
        handleClose={handleUpdateDialogClose}
        teacher={{
            phone,
            photo,
            name,
            designation
        }}
      />
        </>
    );
};

export default TeacherCard;


// import React from 'react';

// const TeacherCard = ({ phone, name, designation,photo }) => {
//     return (
//         <div className="w-[90%]  sm:w-[40%] lg:w-[20%] rounded-lg shadow-lg shadow-slate-300 ">
//             <img src={photo} alt="photo" className="w-full rounded-md mb-4 h-[250px]" />
//             <h2>phone: {phone}</h2>
//             <h2 className="text-xl font-semibold">Name : {name}</h2>
//             <p className="text-gray-600">designation: {designation}</p>
            
//         </div>
//     );
// };

// export default TeacherCard;
