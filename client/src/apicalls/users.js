import axiosInstance from '.';

export const registerUser = async (payload) => {
  try {
    const response = await axiosInstance.post('/api/users/register', payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const loginUser = async (payload) => {
  try {
    const response = await axiosInstance.post('/api/users/login', payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getUserInfo = async () => {
  try {
    const response = await axiosInstance.post('/api/users/get-user-info');
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const verifyOTP = async (payload) => {
  try {
    const response = await axiosInstance.post('/api/users/verify-otp', payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};




  // export function logout() {}      



// we first create routes in userRoutes or other route in routes folder then came here to create function(or action) then go to whre it needed like loginUser used in index.js of login folder
