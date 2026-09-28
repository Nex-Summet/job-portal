import axios from "axios";

const API_URL = "http://localhost:5000/api/applications";

export const getMyApplications = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${API_URL}/my`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};