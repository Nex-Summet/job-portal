import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/jobs`;

export const applyForJob = async (jobId) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${API_URL}/${jobId}/apply`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};