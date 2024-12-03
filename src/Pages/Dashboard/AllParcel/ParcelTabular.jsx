import {  useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

function ParcelTabular({ index, parcel}) {
  const { name, phoneNumber, price, bookingDate, Status, deliveryDate, _id } =
    parcel;
  const axiosSecure = useAxiosSecure();
   
  const { data: delivery = [], refetch } = useQuery({
    queryKey: ["deliveryMan"],
    queryFn: async () => {
      const res = await axiosSecure.get("/user/role?role=DeliveryMan");
      return res.data;
    },
  });
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
    const res = await axiosSecure.patch(`/parcelsAssign/${parcelId}`, assigningData);
    if (res.data.modifiedCount > 0) {
      refetch();
      Swal.fire({
        title: "Assigned to Delivery Man!",
        text: `Parcel has been Assign to ${delivery?.name || 'Delivery Man'}`,
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
      <td>{phoneNumber}</td>
      <td>{bookingDate}</td>
      <td>{deliveryDate}</td>

      <td>{price}</td>
      <td>{Status}</td>
      <td>
        <button
          className="btn bg-orange-400"
          onClick={() => document.getElementById(`my_modal_${_id}`).showModal()}
        >
          Manage
        </button>
        <dialog id={`my_modal_${_id}`} className="modal">
          <div className="modal-box">
            {/* Form starts here */}
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Select Delivery Man</span>
                </label>
                <select
                  {...register("DeliveryManID", { required: true })}
                  className="select select-bordered"
                >
                  <option disabled value="DeliveryManID">
                    Select a Delivery Man
                  </option>
                  {delivery.map((man) => (
                    <option key={man._id} value={man._id}>
                      {man._id + ` (${man.name})`}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Approximate Delivery Date</span>
                </label>
                <input
                  {...register("approximateDeliveryDate", { required: true })}
                  type="date"
                  placeholder="Delivery Date"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  className="btn px-4 btn-primary"
                  onClick={handleSubmit(onSubmit)}
                  // onSubmit={() => handleSubmit(props.navigation)}
                >
                  Assign
                </button>

                <button
                  className="btn bg-red-600 text-white"
                  type="button"
                  onClick={() =>
                    document.getElementById(`my_modal_${_id}`).close()
                  }
                >
                  Close
                </button>
              </div>
            </div>
            {/* Form ends here */}
          </div>
        </dialog>
      </td>
    </tr>
  );
}

export default ParcelTabular;
