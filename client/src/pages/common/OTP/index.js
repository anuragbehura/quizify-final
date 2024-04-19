import React from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineMailLock } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { Form, message, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
import { verifyOTP } from '../../../apicalls/users';
import image from '../../../assets/otp.png';

function OTP() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());

      // Set the email and OTP for verification
      const verifyValues = {
        email: values.email,
        otp: values.otp // Assuming 'otp' is a field in the 'values' object
      };

      // Call the verifyOTP function with email and OTP
      const response = await verifyOTP(verifyValues);

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
          <img src={image} alt='login' height={300} ></img>
          <div className='flex flex-col'>
            <div>
              <Link to='/register'><FaArrowLeft /></Link>
            </div>
            <h1 className='text-2xl'>
              Verify OTP <MdOutlineMailLock />
            </h1>
            <p className='text-2xl'>
              Check Your Registered Email for OTP
            </p>
            <div className='divider'></div>
            <Form layout='vertical' className='mt-2' onFinish={onFinish}>
              <Form.Item name='email' label='Enter Registered Email'>
                <Input type='text' />
              </Form.Item>
              <Form.Item name='otp' label='Enter otp'>
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