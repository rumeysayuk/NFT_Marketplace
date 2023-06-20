import axios from "axios";

const API_URI = process.env.REACT_APP_BASE_API_URI;

export const getUsers = async () => {
   try {
      const response = await axios.get(API_URI + "/users/getAllUsers");
      return response.data;
   } catch (error) {
      throw new Error(error.response.data.error);
   }
};

export const updateUser = async (userId, updatedUserData) => {
   try {
      const response = await axios.put(API_URI + `/users/${userId}`, updatedUserData);
      return response.data;
   } catch (error) {
      throw new Error(error.response.data.error);
   }
}

export const updateAdminInfo = async (userId, updatedUserData) => {
   updatedUserData.profile_img = updatedUserData.profile_img.join('');
   try {
      const response = await axios.put(API_URI + `/users/admin/${userId}`, updatedUserData);
      return response.data;
   } catch (error) {
      throw new Error(error.response.data.error);
   }
}
