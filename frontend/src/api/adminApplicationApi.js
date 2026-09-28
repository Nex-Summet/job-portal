import axios from "axios";

const API_URL = "http://localhost:5000/api/applications";

export const getAllApplications = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};

export const updateApplicationStatus = async (
  applicationId,
  status
) => {
  const token = localStorage.getItem("token");

  const response = await axios.patch(
    `${API_URL}/${applicationId}/status`,
    {
      status: status
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};