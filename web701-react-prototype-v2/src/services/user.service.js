import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8081/api/test/";

// Function to get public content
const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

// Function to get user board content
const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

// Function to get moderator board content
const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

// Function to get admin board content
const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

// Exporting the UserService object with the defined functions
const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};

export default UserService;

