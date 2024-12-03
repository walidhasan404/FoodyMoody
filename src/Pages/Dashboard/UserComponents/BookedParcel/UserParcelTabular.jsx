import { FaEdit } from "react-icons/fa";
import { GiPayMoney } from "react-icons/gi";
import { GoCodeReview } from "react-icons/go";
import { ImCross } from "react-icons/im";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import BookedParcel from "./BookedParcel";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { Authcontext } from "../../../../Providers/AuthProviders";



function UserParcelTabular({ parcel, index,refetch }) {
  const _id = parcel._id;
  const { user } = useContext(Authcontext);
    const axiosSecure = useAxiosSecure();
    const { data: users = [],  } = useQuery({
      queryKey: ["users"],
      queryFn: async () => {
        const res = await axiosSecure.get(`allUsers/${user.email}`);
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
        if (res.data.modifiedCount>0) {
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
  const {
    bookingDate,
    deliveryDate,
    parcelType,
    Status,
    DeliveryManID,
    paymentStatus
  } = parcel;
   const {
     register,
     handleSubmit,
     watch,
     reset,
     formState: { errors },
   } = useForm();
   const onSubmit = async (data) => {
    
     const assigningData = {
       DeliveryManID: data.DeliveryManID,
       name: data.Name,
       image: users?.image,
       review: data.review,
       reviewerEmail:parcel.email
     };

     
     try {
       const res = await axiosSecure.post("/review", assigningData)
        
    
       if (res.data.insertedId) {
         refetch();
         Swal.fire({
           title: "Success",
           text: `Review Success`,
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
    <tr className="hover ">
      <th>{index}</th>
      <td>{parcelType}</td>
      <td>{deliveryDate}</td>
      <td>{deliveryDate}</td>
      <td>{bookingDate}</td>

      <td className="text-center">
        {DeliveryManID ? DeliveryManID : "waiting..."}
      </td>
      <td className="text-orange-300">{Status}</td>
      <td>
        {Status === "Pending" && paymentStatus !== "paid" ? (
          <Link to={`/dashboard/updateParcel/${parcel._id}`}>
            <button className="btn bg-purple-500 text-green-500  text-xl font-bold">
              <FaEdit></FaEdit>
            </button>
          </Link>
        ) : (
          <button
            disabled
            className="btn bg-purple-500 text-green-500  text-xl font-bold"
          >
            <FaEdit></FaEdit>
          </button>
        )}
      </td>
      <td>
        {Status === "Pending" && paymentStatus !== "paid" ? (
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
        {Status === "Delivered" ? (
          <Link>
            <button
              className="btn bg-yellow-400 text-white text-xl font-bold"
              onClick={() =>
                document.getElementById(`my_modal_${_id}`).showModal()
              }
            >
              <GoCodeReview />
            </button>
            <dialog id={`my_modal_${_id}`} className="modal">
              <div className="modal-box">
                {/* Form starts here */}
                <div className="card-body">
                  <div className="flex justify-center">
                    <img {...register("image")}
                      src={users?.image}
                      alt=""
                      className="w-20 h-20 rounded-lg text-center"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Name</span>
                    </label>
                    <input
                      {...register("Name", {
                        required: true,
                      })}
                      type="text"
                      value={users?.name}
                      readOnly
                      className="input input-bordered"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Delivery Man ID</span>
                    </label>
                    <input
                      value={parcel.DeliveryManID}
                      readOnly
                      {...register("DeliveryManID", {
                        required: true,
                      })}
                      type="text"
                      placeholder="Delivery"
                      className="input input-bordered"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Review</span>
                    </label>
                    <textarea {...register('review', {
                      required:true
                    })}
                      placeholder="Express your fellings"
                      className="textarea textarea-bordered textarea-lg w-full"
                    ></textarea>
                  </div>
                  <div className="flex gap-4 mt-6">
                    <button
                      className="btn px-4 btn-primary"
                      onClick={handleSubmit(onSubmit)}
                      // onSubmit={() => handleSubmit(props.navigation)}
                    >
                    Submit
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
          </Link>
        ) : (
          <button
            disabled
            className="btn bg-yellow-400 text-white text-xl font-bold"
          >
            <GoCodeReview />
          </button>
        )}
      </td>
      <td>
        {paymentStatus !== "paid" &&
        Status !== "Cancelled" &&
        Status !== "Delivered" ? (
          <Link to={`/dashboard/payment/${parcel._id}`}>
            <button className="btn bg-green-500 flex text-white text-xl font-bold">
              Pay
            </button>
          </Link>
        ) : (
          <button
            disabled
            className="btn bg-green-500 text-white text-xl font-bold"
          >
            {paymentStatus === "paid" ? <span>Paid</span> : <span>pay</span>}
          </button>
        )}
      </td>
    </tr>
  );
}
export default UserParcelTabular;
