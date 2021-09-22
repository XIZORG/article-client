import * as axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://localhost:8089/rest/"
});

export default axiosInstance;