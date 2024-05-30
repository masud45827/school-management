import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken } from '../store/LoginSlice';
import Check from './Check';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!username || !password) {
            toast.error("Username and password are required");
            return;
        }
        
        setLoading(true);
        
        try {
            const response = await axios.post("http://localhost:3000/user/login", { username, password });
            toast.success("Successfully logged in");
            dispatch(setToken({ username: username, token: response.data }));
            console.log("token", response.data);
            setTimeout(()=>{
                navigate('/');
            },2000);
        } catch (error) {
            toast.error("Error logging in");
            console.error("Error logging in", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='bg-slate-400 flex justify-center items-center min-h-screen'>
            <Check/>
            <form className='w-2/4 bg-white p-6 py-12 my-5 rounded shadow-md' onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <input 
                        name='username' 
                        placeholder='Enter username' 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} 
                        className='w-full border border-gray-400 rounded p-2'
                        disabled={loading}
                    />
                </div>
                <div className='mb-4'>
                    <input 
                        name='password' 
                        type='password'
                        placeholder='Enter password' 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        className='w-full border border-gray-400 rounded p-2'
                        disabled={loading}
                    />
                </div>
                <button 
                    type='submit' 
                    className={`w-full bg-cyan-600 text-white p-2 mt-5 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Submit'}
                </button>
                <p className='pt-2 lg:text-lg'>
                    You are not an admin? <Link to="/register"><span className='font-bold underline text-cyan-500'>Register</span></Link>
                </p>
            </form>
            <ToastContainer />
        </div>
    );
};

export default LoginPage;
