import React, { useState } from 'react';
import axios from 'axios';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";

const NoticeCreateForm = ({ open, handleClose }) => {
    
  const { token } = useSelector((state) => state.login);
  const [newNotice, setNewNotice] = useState({
    id: '',
    description: '',
    pdf: null,
  });

  const handleChange = (e) => {
    setNewNotice({ ...newNotice, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setNewNotice({ ...newNotice, pdf: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(newNotice).forEach(key => {
      formData.append(key, newNotice[key]);
    });

    try {
      const response = await axios.post('http://localhost:3000/notices', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `${token}`
        },
      });
      console.log('Response:', response.data);
      toast.success('Notice added successfully!');
      handleClose();
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.status === 401) {
        toast.error('Unauthorized. Please log in again.');
      } else {
        toast.error('Failed to add notice. Please try again.');
      }
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Notice</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="description"
          label="Description"
          type="text"
          fullWidth
          variant="standard"
          onChange={handleChange}
        />
        <input
          type="file"
          className="mt-4"
          onChange={handleFileChange}
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

export default NoticeCreateForm;
