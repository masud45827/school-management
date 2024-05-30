import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const StudentUpdateForm = ({ open, handleClose, student }) => {
  const [updatedStudent, setUpdatedStudent] = useState({ ...student });
  const [selectedFile, setSelectedFile] = useState(null);
  const token = useSelector((state) => state.login.token);
  console.log(token)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedStudent({ ...updatedStudent, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const submitUpdate = async () => {
    const formData = new FormData();
    for (const key in updatedStudent) {
      formData.append(key, updatedStudent[key]);
    }
    if (selectedFile) {
      formData.append('image', selectedFile);
    }

    try {
      const response = await axios.put(`http://localhost:3000/students/${student.Class}/${student.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `${token}`
        }
      });
      toast.success("update successfully");
      handleClose();
    } catch (error) {
      console.error('Error updating student:', error);
      // Handle the error as needed (e.g., show an error message)
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Update Student</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="name"
          label="Name"
          type="text"
          fullWidth
          value={updatedStudent.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="fatherName"
          label="Father's Name"
          type="text"
          fullWidth
          value={updatedStudent.fatherName}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="motherName"
          label="Mother's Name"
          type="text"
          fullWidth
          value={updatedStudent.motherName}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="address"
          label="Address"
          type="text"
          fullWidth
          value={updatedStudent.address}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="phone"
          label="Phone"
          type="text"
          fullWidth
          value={updatedStudent.phone}
          onChange={handleChange}
        />
        <input
          name="image"
          type="file"
          fullWidth
          onChange={handleFileChange}
          style={{ marginTop: '16px' }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={submitUpdate} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StudentUpdateForm;
