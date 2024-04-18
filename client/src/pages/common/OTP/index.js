import React from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineMailLock } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { Form, message, Select, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
import { verifyOTP } from '../../../apicalls/users';

function OTP() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await verifyOTP(values);
      dispatch(HideLoading());
      
      if (response.success) {
        message.success(response.message);
        navigate('/login');
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };


  return (
    <div className='flex justify-center items-center h-screen w-screen bg-primary'>
      <div className='card w-600 p-3 bg-white'>
      <div className='flex flex-row'>
          <img src={image} alt='login' height={400} ></img>
        <div className='flex flex-col'>
          <div>
            <Link to='/register'><FaArrowLeft /></Link>
          </div>
          <h1 className='text-2xl'>
            Verify OTP <MdOutlineMailLock />
          </h1>
          <div className='divider'></div>
          <Form layout='vertical' className='mt-2' onFinish={onFinish}>
            <Form.Item name='otp' label='Check Your Email for OTP'>
              <Input type='text' />
            </Form.Item>
            <div className='flex flex-col gap-2'>
              <button type='submit' className='primary-contained-btn mt-2 w-100'>
                Verify
              </button>

            </div>
            
          </Form>
        </div>
      </div>
      </div>
    </div>
  );
}

export default OTP;