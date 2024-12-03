import { useContext } from "react";
import { Authcontext } from "../Providers/AuthProviders";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

function useDeliveryMan() {
  const { user } = useContext(Authcontext);

  const axiosSecure = useAxiosSecure();
  const {
    data: isDeliveryMan = false,
    isLoading,
    error,
  } = useQuery({
    queryKey: [user?.email, "isDeliveryMan"],
    enabled: !!user?.email,
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/users/deliveryMan/${user.email}`);
        // console.log(res.data);
        // // Check if the response data is defined
       return res.data?.deliveryMan ?? false;
      } catch (error) {
        console.error("Error fetching isDeliveryMan:", error);
        return false; // Returning a default value in case of error
      }
    },
  });


  return { isDeliveryMan, isLoading, error }; // Return the state variables
}

export default useDeliveryMan;
