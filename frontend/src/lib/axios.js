import axios from 'axios'; //Used to send HTTP requests to the backend API

//Instead of writing out the entire URl everytime, this will return the URL as follows:
const api = axios.create({
    baseURL : "http://localhost:5001/api"
});

export default api;