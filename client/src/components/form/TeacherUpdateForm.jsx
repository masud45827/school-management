import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const TeacherUpdateForm = ({ open, handleClose, teacher }) => {
  const { token } = useSelector((state) => state.login);
  const [updateTeacher, setUpdateTeacher] = useState({
    name: teacher.name,
    phone: teacher.phone,
    designation: teacher.designation,
    image: teacher.photo
  });

  const handleChange = (e) => {
    setUpdateTeacher({ ...updateTeacher, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setUpdateTeacher({ ...updateTeacher, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", updateTeacher.name);
    formData.append("phone", updateTeacher.phone);
    formData.append("designation", updateTeacher.designation);
    if (updateTeacher.image) {
      formData.append("image", updateTeacher.image);
    }
    console.log(formData)
    try {
      const response = await axios.put(`http://localhost:3000/teachers/${teacher.phone}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `${token}`
        }
      });
      console.log('Response:', response.data);
      toast.success('Update successful!');
      handleClose();
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.status === 401) {
        toast.error('Unauthorized. Please log in again.');
      } else {
        toast.error('Update failed. Please try again.');
      }
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Update Teacher</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="name"
          label="Name"
          type="text"
          value={updateTeacher.name}
          fullWidth
          variant="standard"
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="phone"
          label="Phone"
          type="text"
          value={updateTeacher.phone}
          fullWidth
          variant="standard"
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="designation"
          label="Designation"
          value={updateTeacher.designation}
          type="text"
          fullWidth
          variant="standard"
          onChange={handleChange}
        />
        <input
          type="file"
          className="mt-4"
          onChange={handleImageChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TeacherUpdateForm;
