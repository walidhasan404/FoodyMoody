import axios from "axios"
import { useContext } from "react";
import { Authcontext } from "../Providers/AuthProviders";
import { useNavigate } from "react-router-dom";

 const axiosSecure = axios.create({
  baseURL: "https://percel-server-seven.vercel.app",
});
function useAxiosSecure() {
  const { logOut } = useContext(Authcontext);
  const navigate = useNavigate();
  axiosSecure.interceptors.request.use(function (config) {
    const token = localStorage.getItem('access-token');
    config.headers.authorization = `Bearer ${token}`
     return config;
  })

  // For status code
  axiosSecure.interceptors.response.use(function (response) {
    return response;
  }, async (error) => {
    const status = error.response.status;
    if (status === '401' || status === '403') {
      await logOut();
      navigate('/login');
    }
    return Promise.reject(error);
    
  })
 
  return axiosSecure
}
export default useAxiosSecure