import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import ParcelTabular from "./ParcelTabular";

function AllParcel() {
  const axiosSecure = useAxiosSecure();
  const { data: parcel=[],refetch} = useQuery({
    queryKey:[ 'parcel'],
    queryFn: async () => {
        const res = await axiosSecure.get("/parcels");
          //  console.log(res.data);
      return res.data
    
    }
  })
    
  return (
    <div>
      <h2 className="text-center mt-2">Total Parcel: {parcel.length}</h2>
      <div className="divider"></div>
      <div className="overflow-x-auto">
        <table className="table ">
          {/* head */}
          <thead>
            <tr className="text-center">
              <th>#</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Booking Date</th>
              <th>Requested Delivery Date</th>
              <th>Cost</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* rows */}
            {parcel.map((parcel, index) => (
              <ParcelTabular
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
export default AllParcel