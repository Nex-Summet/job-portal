import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/jobs`;

export const createJob = async (jobData) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    API_URL,
    jobData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};

export const getAllJobs = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

export const deleteJob = async (jobId) => {
  const token = localStorage.getItem("token");

  const response = await axios.delete(
    `${API_URL}/${jobId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};

export const updateJob = async (jobId, jobData) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${API_URL}/${jobId}`,
    jobData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};