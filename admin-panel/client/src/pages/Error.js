import React from 'react';
import {useNavigate} from 'react-router-dom'
import error from "../assets/images/error.svg";
const Error = () => {
    const navigate=useNavigate()
    return (
        <div>
            <div className='misc-inner p-2 p-sm-3'>
                <div className='w-100 text-center'>
                    <h2 className='mb-1'>Page Not Found 🕵🏻‍♀️</h2>
                    <p className='mb-2'>Oops! 😖 The requested URL was not found on this server.</p>
                    <button onClick={()=>navigate("/")} color='primary' className='btn-sm-block mb-2'>
                        Back to home
                    </button>
                    <img className='img-fluid' src={error} alt='Not authorized page'/>
                </div>
            </div>
        </div>
    );
};

export default Error;