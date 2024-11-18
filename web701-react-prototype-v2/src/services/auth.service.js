import axios from "axios";
import { jwtDecode } from 'jwt-decode'

const API_URL = "http://localhost:8081/api/auth/";

// Function to register a new user
const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

// Function to login a user
const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      console.log("Login response:", response.data);

      if (response.data.token) {
        console.log("Token:", response.data.token);
        const decodedToken = jwtDecode(response.data.token);
        console.log("Decoded token:", decodedToken);
        localStorage.setItem("user", JSON.stringify(decodedToken));
        console.log("User stored in localStorage:", localStorage.getItem("user"));
      }

      return response.data;
    });
};

// Function to logout a user
const logout = () => {
  localStorage.removeItem("user");
};

// Function to get the current logged-in user
const getCurrentUser = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  return currentUser;
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
