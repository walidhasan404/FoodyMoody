import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import DeliveryTabular from "./DeliveryTabular";
function AllDeliveryMan() {
  const axiosSecure = useAxiosSecure();
  const { data: delivery=[],refetch} = useQuery({
    queryKey:[ 'deliveryMan'],
    queryFn: async () => {
        const res = await axiosSecure.get("/user/role?role=DeliveryMan");
          //  console.log(res.data);
      return res.data
    
    }
  })
    
  return (
    <div>
          <h2 className="text-center mt-2">Total Delivery Man: {delivery.length}</h2>
          <div className="divider"></div>
      <div className="overflow-x-auto">
        <table className="table ">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Number of parcel delivered</th>
              <th>Average review</th>
            </tr>
          </thead>
          <tbody>
            {/* rows */}
            {delivery.map((delivery, index) => (
              <DeliveryTabular
                key={delivery._id}
                delivery={delivery}
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
export default AllDeliveryMan