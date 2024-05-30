import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import StudentUpdateForm from "../form/StudentUpdateForm";

const StudentCard = ({
  key,
  fatherName,
  motherName,
  address,
  photo,
  phone,
  name,
  Class,
  id,
}) => {
  const { username, token } = useSelector((state) => state.login);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

  const handleDelete = async (e) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/students/${Class}/${id}`,
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
        <img
          className="rounded-lg h-[250px] w-full"
          src={photo}
          alt="Student"
        />
        <div className="flex flex-col justify-center items-center">
          <h2>Student Name: {name}</h2>
          <p>Student Class: {Class}</p>
          <p>Student id: {id}</p>
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
      <StudentUpdateForm
        open={openUpdateDialog}
        handleClose={handleUpdateDialogClose}
        student={{
          fatherName,
          motherName,
          address,
          photo,
          phone,
          name,
          Class,
          id,
        }}
      />
    </>
  );
};

export default StudentCard;
