import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const [active,setActive] = useState('');
    const { username } = useSelector((state) => state.login);
    const [isListVisible, setListVisible] = useState(false);
    const [iconMenu, setIcon] = useState(faBars);

    const toggleListVisibility = () => {
        setListVisible(!isListVisible);
    };

    const showBarFun = () => {
        setIcon((prevState) => (prevState === faBars ? faXmark : faBars));
        toggleListVisibility();
    };

    return (
        <div className='sticky top-0 '>
            <div className='bg-slate-600 md:h-[50px] md:flex md:flex-row md:items-center md:justify-center'>
                <FontAwesomeIcon className="z-10 pl-5 h-[40px] text-white sm:block md:hidden lg:hidden" icon={iconMenu} onClick={showBarFun} />
                <ul className={`w-full left-0 top-0 text-center text-white md:flex md:flex-row ${isListVisible ? 'block' : 'hidden'}`}>
                    <li onClick={() => setActive('home')} className={`px-2 p-0.5 hover:bg-cyan-600 hover:rounded-lg md:mr-5 lg:text-xl flex items-center justify-center ${active === 'home'? 'bg-cyan-600' : ''}`}>
                        <Link to="/">Home</Link>
                    </li>
                    <li onClick={() => setActive('Teacher')} className={`px-2 p-0.5 hover:bg-cyan-600 hover:rounded-lg md:mr-5 lg:text-xl flex items-center justify-center ${active === 'Teacher' ? 'bg-cyan-600' : ''}`}>
                        <Link to="/teacher">Teacher</Link>
                    </li>
                    <li onClick={() => setActive('Student')} className={`px-2 p-0.5 hover:bg-cyan-600 hover:rounded-lg md:mr-5 lg:text-xl flex items-center justify-center ${active === 'Student' ? 'bg-cyan-600' : ''}`}>
                        <Link to="/student">Student</Link>
                    </li>
                    <li onClick={() => setActive('Notice')} className={`px-2 p-0.5 hover:bg-cyan-600 hover:rounded-lg md:mr-5 lg:text-xl flex items-center justify-center ${active === 'Notice' ? 'bg-cyan-600' : ''}`}>
                        <Link to="/notice">Notice</Link>
                    </li>
                    <li onClick={() => setActive('Result')} className={`px-2 p-0.5 hover:bg-cyan-600 hover:rounded-lg md:mr-5 lg:text-xl flex items-center justify-center ${active === 'Result' ? 'bg-cyan-600' : ''}`}>
                        <Link to="/result">Result</Link>
                    </li>
                    <li onClick={() => setActive('Admission')} className={`px-2 p-0.5 hover:bg-cyan-600 hover:rounded-lg md:mr-5 lg:text-xl flex items-center justify-center ${active === 'Admission' ? 'bg-cyan-600' : ''}`}>
                        <Link to="/admission">Admission</Link>
                    </li>
                    {username ? (
                        <li className='ml-auto px-2 p-0.5 md:mr-5 lg:text-xl flex items-center justify-center'>
                            
                            <Link to="/admin">{username}</Link>
                            <Link to='/logout' className='pl-2'>logout</Link>
                        </li>
                    ) : (
                        <li onClick={() => setActive('Login')} className={`ml-auto px-2 p-0.5 hover:bg-cyan-600 hover:rounded-lg md:mr-5 lg:text-xl flex items-center justify-center ${active === 'Login' ? 'bg-cyan-600' : ''}`}>
                            <Link to="/login">Login</Link>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
