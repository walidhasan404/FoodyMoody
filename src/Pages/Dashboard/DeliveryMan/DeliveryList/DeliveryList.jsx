import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

import { useContext } from "react";
import { Authcontext } from "../../../../Providers/AuthProviders";
import DeliveryTable from "./DeliveryTable";

function DeliveryList() {
  const { user } = useContext(Authcontext);
  const axiosSecure = useAxiosSecure();

  // console.log(user.email)
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`allUsers/${user.email}`);
      return res.data;
    },
  });

  const { data: myParcel = [], refetch } = useQuery({
    queryKey: ["myParcel"],
    enabled: !!users?._id,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `parcels/Delivery/DeliveryManID?DeliveryManID=${users._id}`
      );
      //  console.log(res.data);

      return res.data;
    },
  });
//   console.log(myParcel);

  return (
    <div>
      <h2 className="text-center mt-2">Total Parcel: {myParcel.length}</h2>
      <div className="divider"></div>
      <div className="overflow-x-auto">
        <table className="table ">
          {/* head */}
          <thead>
            <tr className="text-center">
              <th>#</th>
              <th>
                {" "}
                Booked User’s <br /> Name
              </th>
              <th>Receivers Name</th>
              <th>
                Booked User’s <br /> Phone
              </th>
              <th>
                Requested <br /> Delivery Date
              </th>
              <th>
                Approximate <br /> Delivery Date
              </th>
              <th>
                ● Recievers <br />
                phone number
              </th>
              <th>
                Receivers <br /> Address
              </th>
              <th>View <br /> Location</th>
              <th>Cancel</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* rows */}
            {myParcel.map((parcel, index) => (
              <DeliveryTable
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
export default DeliveryList;
