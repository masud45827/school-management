import React, { useState } from "react";
import axios from "axios";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";

const StudentRegistrationForm = ({ open, handleClose }) => {
  const { token } = useSelector((state) => state.login);
  const [newStudent, setNewStudent] = useState({
    id: '',
    Class: '',
    name: '',
    fatherName: '',
    motherName: '',
    phone: '',
    address: '',
    image: null
  });

  const handleChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setNewStudent({ ...newStudent, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(newStudent).forEach(key => {
      formData.append(key, newStudent[key]);
    });

    try {
      const response = await axios.post('http://localhost:3000/students/register', formData, {
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
      <DialogTitle>Add New Student</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="Class"
          label="Class"
          type="number"
          fullWidth
          variant="standard"
          onChange={handleChange}
        />
        <TextField
          autoFocus
          margin="dense"
          name="id"
          label="ID"
          type="number"
          fullWidth
          variant="standard"
          onChange={handleChange}
        />
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
          name="fatherName"
          label="Father's Name"
          type="text"
          fullWidth
          variant="standard"
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="motherName"
          label="Mother's Name"
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
          name="address"
          label="Address"
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

export default StudentRegistrationForm;
