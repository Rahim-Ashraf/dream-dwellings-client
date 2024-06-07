import axios from "axios";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: "https://dream-dwellings-server.vercel.app"
})
const useAxiosSecure = () => {
    const navigate = useNavigate();
    axiosSecure.interceptors.request.use(config => {
        const token = localStorage.getItem('access-token');
        config.headers.authorization = token;
        return config;
    }, error => {
        return Promise.reject(error);
    });


    // intercepts 401 and 403 status
    axiosSecure.interceptors.response.use((response) => {
        return response;
    }, (error) => {
        const status = error.response.status;
        if (status === 401 || status === 403) {
            navigate('/');
        }
        return Promise.reject(error);
    })


    return axiosSecure
};

export default useAxiosSecure;