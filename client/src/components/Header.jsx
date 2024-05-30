import React from 'react';
import image  from '../assets/image/logo.png'
import logo  from '../assets/image/mujib logo.png'
const Header = () => {
    return (
        <div className=''>
            <div className=' flex flex-row justify-between items-center bg-lime-500'>
            <img src={image} alt='logo' className='h-[100px] w-[100px] rounded-md m-2  sm:h-[150px] sm:w-[200px]'  />
            <div className='flex flex-col justify-center items-center'>
                
            <h1 className='text-white m-2 text-2xl sm:text-3xl '>Balaram Hat B.L High School</h1>
             <h1 className='text-white m-2 text-2xl sm:text-3xl '>Boda,Panchagarh</h1>
            </div>

            <img src={logo} alt='logo' className='hidden h-[100px] w-[100px] rounded-md m-2  sm:h-[150px] sm:w-[200px] lg:block'  />
            </div>
        </div>
    );
};

export default Header;