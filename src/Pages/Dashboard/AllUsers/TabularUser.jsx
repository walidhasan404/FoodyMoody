import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useContext } from "react";
import { Authcontext } from "../../../Providers/AuthProviders";

function TabularUser({ user: userData, index, refetch }) {
  const { user } = useContext(Authcontext)
 
console.log(userData)
    const axiosSecure = useAxiosSecure()
    // console.log(user)
    const handleMakeAdmin = (user) => {
        axiosSecure.patch(`/users/admin/${userData._id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${userData.name} is admin now`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    }
    const handleMakeDelivery = user => {
        axiosSecure.patch(`/users/delivery/${userData._id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${userData.name} is Delivey Man now`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    }
   
    return (
      <tr className="hover text-center">
        <th>{index}</th>
        <td>{userData.name}</td>
        <td>{userData?.phoneNumber}</td>
        <td>
          {userData?.role === "DeliveryMan" ? (
            "Delivery Man"
          ) : (
            <button
              disabled={userData.email===user.email}
              className="btn bg-blue-400"
              onClick={() => handleMakeDelivery(userData)}
            >
              Make Delivery Man
            </button>
          )}
        </td>

        <td>
          {userData?.role === "admin" ? (
            "Admin"
          ) : (
            <button
              className="btn bg-orange-400"
              onClick={() => handleMakeAdmin(user)}
            >
              Make Admin
            </button>
          )}
        </td>
      </tr>
    );
}

export default TabularUser