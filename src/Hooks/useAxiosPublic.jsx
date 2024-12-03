import axios from "axios"

const axiosPublic = axios.create({
  baseURL: "https://percel-server-seven.vercel.app",
}); 
function useAxiosPublic() {
  return axiosPublic
}
export default useAxiosPublic