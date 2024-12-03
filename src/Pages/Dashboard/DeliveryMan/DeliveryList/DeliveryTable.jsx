import { useQuery } from "@tanstack/react-query";

import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { IoLocation } from "react-icons/io5";
import { ImCross } from "react-icons/im";
import GoogleMap from "../../../../Components/GoogleMap/GoogleMap";

function DeliveryTable({ index, parcel ,refetch}) {
  const { name,receiverName, phoneNumber,ApproximateDeliveryDate
, price, bookingDate,receiverPhoneNumber,deliveryAddress, Status, deliveryDate, _id } =
    parcel;
  const axiosSecure = useAxiosSecure();

  const { data: delivery = [],  } = useQuery({
    queryKey: ["deliveryMan"],
    queryFn: async () => {
      const res = await axiosSecure.get("/user/role?role=DeliveryMan");
      return res.data;
    },
  });
  const handleCancel = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/parcels/${id}`);
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "Cancelled!",
            text: `${parcel.parcelType} has been Cancelled`,
            icon: "success",
          });
        }
      } catch (error) {
        console.error("Error canceling parcel:", error);
        Swal.fire({
          title: "Error!",
          text: "There was an error deleting your file.",
          icon: "error",
        });
      }
    }
  };
  const handleDeliver = async (id) => {
      const assigningData = {
        Status: "Delivered",
      };
     const result = await Swal.fire({
       title: "Are you sure?",
       icon: "warning",
       showCancelButton: true,
       confirmButtonColor: "#3085d6",
       cancelButtonColor: "#d33",
       confirmButtonText: "Yes, Deliver it!",
     });

     if (result.isConfirmed) {
       try {
          const res = await axiosSecure.patch(
            `/parcelsAssign/${id}`,
            assigningData
          );
         console.log(res.data);
         if (res.data.modifiedCount > 0) {
           refetch();
           Swal.fire({
             title: "Delivered!",
             text: `${parcel.parcelType} has been Delivered`,
             icon: "success",
           });
         }
       } catch (error) {
         console.error("Error canceling parcel:", error);
         Swal.fire({
           title: "Error!",
           text: "There was an error deleting your file.",
           icon: "error",
         });
       }
     }
   };
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // Log the form data and parcelId
    console.log(data, _id);
    const parcelId = _id;
    // Construct the assigningData object
    const assigningData = {
      DeliveryManID: data["DeliveryManID"],
      ApproximateDeliveryDate: data["approximateDeliveryDate"], // Access values by their names
      Status: "On the way",
    };

    // console.log(assigningData);
    refetch();

    try {
      const res = await axiosSecure.patch(
        `/parcelsAssign/${parcelId}`,
        assigningData
      );
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          title: "Assigned to Delivery Man!",
          text: `${parcel.name} has been Assign`,
          icon: "success",
        });

        document.getElementById(`my_modal_${_id}`).close();
      }
      console.log("Response:", res.data);
    } catch (error) {
      console.error("Error updating parcel:", error);
    }
  };

  return (
    <tr className="hover text-center">
      <th>{index}</th>
      <td>{name}</td>
      <td>{receiverName}</td>
      <td>{phoneNumber}</td>
      <td>{deliveryDate}</td>

      <td>{ApproximateDeliveryDate}</td>
      <td>{receiverPhoneNumber}</td>
      <td>{deliveryAddress}</td>

      <td>
        <button
          className="btn bg-orange-400 flex"
          onClick={() => document.getElementById(`my_modal_${_id}`).showModal()}
        >
          <IoLocation className="text-2xl text-white" />
        </button>
        <dialog id={`my_modal_${_id}`} className="modal">
          <div className="modal-box">
            {/* Form starts here */}

            <GoogleMap></GoogleMap>
            <button
              className="btn mt-4 text-right bg-red-600 text-white"
              type="button"
              onClick={() => document.getElementById(`my_modal_${_id}`).close()}
            >
              Close
            </button>

            {/* Form ends here */}
          </div>
        </dialog>
      </td>
      <td>
        {  Status === "On the way" ? (
          <button
            onClick={() => handleCancel(parcel._id)}
            className="btn bg-red-600 text-white text-xl font-bold"
          >
            <ImCross />
          </button>
        ) : (
          <button
            disabled
            onClick={() => handleCancel(parcel._id)}
            className="btn bg-red-600 text-white text-xl font-bold"
          >
            <ImCross />
          </button>
        )}
      </td>
      <td>
        {Status !== "Cancelled" && Status !== "Delivered" ? (
          <button
            className="btn btn-success"
            onClick={() => handleDeliver(parcel._id)}
          >
            Deliver
          </button>
        ) : (
          <button className="btn btn-secondary" disabled>
            {Status !== "Cancelled" && "Delivered"}
            {Status !== "Delivered" && "Canceled"}
          </button>
        )}
      </td>
    </tr>
  );
}

export default DeliveryTable;
