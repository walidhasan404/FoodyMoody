import React, { useContext, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Authcontext } from "../../../Providers/AuthProviders";
import { useForm } from "react-hook-form";
import parcelImg from "../../../assets/Parcel/parcel.png";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useLoaderData, useParams } from "react-router-dom";

function UpdateParcel() {
  const { user } = useContext(Authcontext);
  const existParcel = useLoaderData();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: existParcel,
  });

  useEffect(() => {
    reset(existParcel); // Populate the form with existing parcel data
  }, [existParcel, reset]);

  const onSubmit = async (data) => {
    const updatingData = {
      ...data,
    };

    try {
      const res = await axiosSecure.patch(`/update/${id}`, updatingData);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Updated!",
          text: `Data has been updated`,
          icon: "success",
        });
        reset();
      }
    } catch (error) {
      console.error("Error updating parcel:", error);
      Swal.fire({
        title: "Error!",
        text: "There was an error updating the parcel.",
        icon: "error",
      });
    }
  };

  if (!existParcel) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>FoodyMoody | Update</title>
      </Helmet>
      <div className="flex justify-center mt-2 mx-auto">
        <img className="w-56" src={parcelImg} alt="Parcel" />
      </div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content">
          <div className="card w-full shadow-2xl bg-base-100">
            <form
              className="card-body w-full"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col md:flex-row lg:flex-row gap-6 justify-between">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="input input-bordered"
                    value={existParcel?.name}
                    readOnly
                    {...register("name")}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    className="input input-bordered"
                    value={user.email}
                    readOnly
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row lg:flex-row gap-6 justify-between">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Phone Number</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Phone Number"
                    defaultValue={existParcel?.phoneNumber}
                    className="input input-bordered"
                    {...register("phoneNumber", { required: true })}
                  />
                  {errors.phoneNumber && <span>This field is required</span>}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Parcel Type</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Parcel Type"
                    defaultValue={existParcel?.parcelType}
                    className="input input-bordered"
                    {...register("parcelType", { required: true })}
                  />
                  {errors.parcelType && <span>This field is required</span>}
                </div>
              </div>

              <div className="flex flex-col md:flex-row lg:flex-row gap-6 justify-between">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Parcel Weight (kg)</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Parcel Weight"
                    defaultValue={existParcel?.parcelWeight}
                    className="input input-bordered"
                    {...register("parcelWeight", { required: true, min: 0 })}
                  />
                  {errors.parcelWeight && <span>Must be greater than 0</span>}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Receiver’s Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Receiver’s Name"
                    defaultValue={existParcel?.receiverName}
                    className="input input-bordered"
                    {...register("receiverName", { required: true })}
                  />
                  {errors.receiverName && <span>This field is required</span>}
                </div>
              </div>

              <div className="flex flex-col md:flex-row lg:flex-row gap-6 justify-between">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Receiver's Phone Number</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Receiver's Phone Number"
                    defaultValue={existParcel?.receiverPhoneNumber}
                    className="input input-bordered"
                    {...register("receiverPhoneNumber", { required: true })}
                  />
                  {errors.receiverPhoneNumber && (
                    <span>This field is required</span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Parcel Delivery Address</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Parcel Delivery Address"
                    defaultValue={existParcel?.deliveryAddress}
                    className="input input-bordered"
                    {...register("deliveryAddress", { required: true })}
                  />
                  {errors.deliveryAddress && (
                    <span>This field is required</span>
                  )}
                </div>
              </div>

              <div className="flex flex-col md:flex-row lg:flex-row gap-6 justify-between">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Requested Delivery Date</span>
                  </label>
                  <input
                    type="date"
                    placeholder="Requested Delivery Date"
                    defaultValue={existParcel?.deliveryDate}
                    className="input input-bordered"
                    {...register("deliveryDate")}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">
                      Delivery Address Latitude
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 21.121365496"
                    defaultValue={existParcel?.deliveryLatitude}
                    className="input input-bordered"
                    {...register("deliveryLatitude", { required: true })}
                  />
                  {errors.deliveryLatitude && (
                    <span>This field is required</span>
                  )}
                </div>
              </div>

              <div className="flex flex-col md:flex-row lg:flex-row gap-6 justify-between">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">
                      Delivery Address Longitude
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 21.121365496"
                    defaultValue={existParcel?.deliveryLongitude}
                    className="input input-bordered"
                    {...register("deliveryLongitude", { required: true })}
                  />
                  {errors.deliveryLongitude && (
                    <span>This field is required</span>
                  )}
                </div>
              </div>

              <div className="form-control mt-6">
                <button className="btn btn-secondary" type="submit">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateParcel;
