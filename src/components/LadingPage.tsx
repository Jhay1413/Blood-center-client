
import { useState } from 'react';
import loginSideImg from '../assets/side-image.jpg'
import LoginPage from './Auth/LoginPage';
import RegistrationPage from './Auth/RegisterPage';
import {FaArrowLeftLong} from "react-icons/fa6";
const LandingPage = () => {
    return ( 
        <>
            <div className='min-h-screen w-full bg-red-900 flex items-center justify-center'>
            <div className='w-3/4 grid grid-cols-2 shadow-lg'>
                <div className='rounded-lg '>
                    <img src={loginSideImg} />
                </div>
                <LandingMenu/>
            </div>
        </div>

        </>
     );
}
const LandingMenu = () =>{
    return (
        <>
            <div className='flex flex-col bg-white w-full'>
               
                <div className='flex flex-col items-center justify-center space-y-2 bg-white w-full h-full'>
                            
                        <LoginPage/>
                </div>
               
            </div>
        </>
    )
}
 
export default LandingPage;