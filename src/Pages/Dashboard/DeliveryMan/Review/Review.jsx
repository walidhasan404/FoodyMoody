import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useContext } from 'react';
import { Authcontext } from './../../../../Providers/AuthProviders';

function Review() {
  const {user}=useContext(Authcontext)
  const axiosSecure = useAxiosSecure();
  
   const { data: DBuser = [], refetch } = useQuery({
     queryKey: ["DBuser"],
     queryFn: async () => {
       const res = await axiosSecure.get(`/allUsers/${user.email}`);
       //  console.log(res.data);

       return res.data;
     },
   });
   const { data: reviews = [] } = useQuery({
     queryKey: ["reviews"],
     enabled: !!DBuser?.email,
     queryFn: async () => {
       const res = await axiosSecure.get(`review/${DBuser._id}`);
       //  console.log(res.data);

       return res.data;
     },
   });
  return (
    <div>
      <div className="text-center text-2xl py-4 mb-9 bg-slate-300">
        <p>What people Say? </p>
      </div>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-12">
        {reviews.map((review) => (
          <div className="card card-compact  bg-base-100 shadow-xl">
            <figure>
              <img
                src={review.image}
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{ review.name}</h2>
              <p>{ review.review}</p>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Review