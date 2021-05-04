import axios from "axios";
const token = JSON.parse(localStorage.getItem('default_auth_token')) 
export default axios.create({
  withCredentials: true,
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-type": "application/json",
    // "Authorization": 'Bearer ' + token
  }
});