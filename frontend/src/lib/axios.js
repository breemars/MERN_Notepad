import axios from 'axios'; //Used to send HTTP requests to the backend API

//In development, the URL will be localhost
//In production, the URL will be the one assigned by Render.com
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api"

//Instead of writing out the entire URl everytime, this will return the URL as follows:
const api = axios.create({
    baseURL : BASE_URL,
});

export default api;