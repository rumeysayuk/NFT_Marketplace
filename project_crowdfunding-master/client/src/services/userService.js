// services/userService.js

import axios from "axios";

const API_URL = "http://localhost:6000/api/users/loginWithMetamask";

export const createUser = async (userData) => {
  const response = await axios.post(API_URL, userData);
  return response.data;
};
