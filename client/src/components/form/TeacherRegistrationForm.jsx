import React, { useState } from "react";
import axios from "axios";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";

const TeacherRegistrationForm = ({ open, handleClose }) => {
  const { token } = useSelector((state) => state.login);
  const [newTeacher, setNewTeacher] = useState({
    name: '',
    phone: '',
    designation: '',
    image: null
  });

  const handleChange = (e) => {
    setNewTeacher({ ...newTeacher, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setNewTeacher({ ...newTeacher, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(newTeacher).forEach(key => {
      formData.append(key, newTeacher[key]);
    });

    try {
      const response = await axios.post('http://localhost:3000/teachers', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `${token}`
        }
      });
      console.log('Response:', response.data);
      toast.success('Registration successful!');
      handleClose();
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.status === 401) {
        toast.error('Unauthorized. Please log in again.');
      } else {
        toast.error('Registration failed. Please try again.');
      }
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Teacher</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="phone"
          label="Phone"
          type="text"
          fullWidth
          variant="standard"
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="designation"
          label="Designation"
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
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TeacherRegistrationForm;
