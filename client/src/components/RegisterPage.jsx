import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [secret_key, setSecret_key] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('name', name);
            formData.append('password', password);
            formData.append('phone', phone);
            formData.append('secret_key', secret_key);
            formData.append('image', image);
            console.log(username, name, password, phone, secret_key, image);
            console.log(formData);

            const response = await axios.post('http://localhost:3000/user/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Response:', response.data);
            toast.success('Registration successful!');
            setTimeout(()=>{
                navigate('/login');
            },2000);
           
        } catch (error) {
            console.error('Error:', error);
            toast.error('Registration failed. Please try again.');
        }
    };

    return (
        <div className='flex justify-center items-center bg-orange-200'>
            <form className='w-2/4 my-5 shadow-lg bg-white p-5' onSubmit={handleSubmit}>
                <div className=''>
                    <input
                        placeholder='username'
                        type="text"
                        className='border rounded-md border-gray-950 w-full p-2 mb-1'
                        onChange={(e) => { setUsername(e.target.value) }}
                    />
                </div>
                <div className=''>
                    <input
                        placeholder='name'
                        type="text"
                        className='border rounded-md border-gray-950 w-full p-2 mb-1'
                        onChange={(e) => { setName(e.target.value) }}
                    />
                </div>
                <div className=''>
                    <input
                        placeholder='password'
                        type="password"
                        className='border rounded-md border-gray-950 w-full p-2 mb-1'
                        onChange={(e) => { setPassword(e.target.value) }}
                        required
                    />
                </div>
                <div className=''>
                    <input
                        placeholder='phone'
                        type="text"
                        className='border rounded-md border-gray-950 w-full p-2 mb-1'
                        onChange={(e) => { setPhone(e.target.value) }}
                        required
                    />
                </div>
                <div className=''>
                    <input
                        placeholder='secret_key'
                        type="text"
                        className='border rounded-md border-gray-950 w-full p-2 mb-1'
                        onChange={(e) => { setSecret_key(e.target.value) }}
                        required
                    />
                </div>
                <div className=''>
                    <input
                        placeholder='image'
                        type="file"
                        className='border w-full p-2 mb-1'
                        onChange={(e) => { setImage(e.target.files[0]) }}
                        required
                    />
                </div>
                <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                    Submit
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default RegisterPage;
