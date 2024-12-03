import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useContext, useState } from "react";
import { Authcontext } from "../../../../Providers/AuthProviders";
import UserParcelTabular from "./UserParcelTabular";

function BookedParcel() {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(Authcontext);
   const [filter, setFilter] = useState("All");
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", user?.email],
    queryFn: async () => {
        const res = await axiosSecure.get(`/parcels/${user.email}`);
       
      //  console.log(res.data);
        return res.data;
       
    },
  });
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Filter parcels based on selected filter
  const filteredParcels =
    filter === "All"
      ? parcels
      : parcels.filter((parcel) => parcel.Status === filter);

 

  return (
    <div>
      <div className="flex gap-3 items-center mt-1 mr-4 justify-end mb-4">
        <label htmlFor="statusFilter" className="mr-2">
          Filter by Status:
        </label>
        <select
          id="statusFilter"
          value={filter}
          onChange={handleFilterChange}
          className="select select-bordered"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Delivered">Delivered</option>
          <option value="On the way">On the way</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="table ">
          {/* head */}
          <thead className="text-center font-extrabold bg-base-200">
            <tr>
              <th>#</th>
              <th>Type</th>
              <th>
                Requested <br /> Delivery Date
              </th>
              <th>
                Approximate <br /> Delivery Date
              </th>
              <th>Booking Date</th>
              <th>
                Delivery Men <br />
                ID
              </th>
              <th>Booking Status</th>
              <th>Update</th>
              <th>Cancel</th>
              <th>Review</th>
              <th>Pay</th>
            </tr>
          </thead>
          <tbody>
            {/* rows */}
            {filteredParcels.map((parcel, index) => (
              <UserParcelTabular
                key={parcel._id}
                parcel={parcel}
                index={index + 1}
                refetch={refetch}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default BookedParcel;
