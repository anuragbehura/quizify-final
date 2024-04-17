import React from 'react'

function OTP() {
  return (
    <div className='flex justify-center items-center h-screen w-screen bg-primary'>
      <div className='card w-400 p-3 bg-white'>
        <div className='flex flex-col'>
          <h1 className='text-2xl'>
            Verify OTP<i className='ri-user-add-line'></i>
          </h1>
          <div className='divider'></div>
          <Form layout='vertical' className='mt-2' onFinish={onFinish}>
            <Form.Item name='name' label='Name'>
              <Input type='text' />
            </Form.Item>
            <Form.Item name='email' label='Email'>
              <Input type='text' />
            </Form.Item>
            <Form.Item name='password' label='Password'>
              <Input type='password' />
            </Form.Item>
            <Form.Item name='isAdmin' label='Are you a teacher?' initialValue={false}>
              <Select>
                <Option value={false}>No</Option>
                <Option value={true}>Yes</Option>
              </Select>
            </Form.Item>
            <div className='flex flex-col gap-2'>
              <button type='submit' className='primary-contained-btn mt-2 w-100'>
                Register
              </button>
              <div>
                Already a member? <Link to='/login'>Login</Link>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default OTP;