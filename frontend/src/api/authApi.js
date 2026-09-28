import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/auth`;

export const registerUser = async (userData) => {
  const response = await axios.post(
    `${API_URL}/register`,
    userData
  );

  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axios.post(
    `${API_URL}/login`,
    userData
  );

  return response.data;
};

export const getProfile = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/profile`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};