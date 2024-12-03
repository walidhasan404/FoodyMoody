// Features.js
import React from "react";
import CountUp from "react-countup";
import AnimatedText from "../../../Shared/AnimatedText/AnimatedText";
import safetyimg from '../../../assets/Features/parcel-sefty.png'
import fastDelivery from "../../../assets/Features/fast-delivery.png";
import satisfaction from "../../../assets/Features/satisfaction.png";
import { IoPeopleSharp } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { BiPurchaseTagAlt } from "react-icons/bi";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Features = ({ stats }) => {
  const axiosSecure = useAxiosSecure();
  const { data: parcel = [] } = useQuery({
    queryKey: ["parcel"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels");
      //  console.log(res.data);
      return res.data;
    },
  });
   const { data: users = [], refetch } = useQuery({
     queryKey: ["users"],
     queryFn: async () => {
       const res = await axiosSecure.get("/allUsers/common");
       return res.data;
     },
   });
  const deliveredParcels = parcel.filter(
    (parcel) => parcel.Status === "Delivered"
  );
//  console.log(deliveredParcels)
  return (
    <div className="features my-10 mx-6">
      <div className="text-center my-5">
        <AnimatedText text={"Our Featurs"}></AnimatedText>
        <p className="my-6">
          "Discover unparalleled parcel safety, super fast delivery, and
          excellent service with our cutting-edge delivery system."
        </p>
      </div>
      <div className="feature-cards  grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-5">
        <div className="card  bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <img src={safetyimg} alt="Shoes" className="rounded-xl" />
          </figure>
          <div className="card-body items-center text-center">
            <h3 className="text-xl font-bold">Food Parcel Safety</h3>
            <p>Ensuring your parcel is safe and secure.</p>
          </div>
        </div>

        <div className="card  bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <img src={fastDelivery} alt="Shoes" className="rounded-xl" />
          </figure>
          <div className="card-body items-center text-center">
            <h3 className="text-xl font-bold">Super Fast Delivery</h3>
            <p>Get your parcel delivered in no time.</p>
          </div>
        </div>

        <div className="card  bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <img src={satisfaction} alt="Shoes" className="rounded-xl" />
          </figure>
          <div className="card-body items-center text-center">
            <h3 className="text-xl font-bold">Excellent Service</h3>
            <p>Top-notch customer support at your service.</p>
          </div>
        </div>
      </div>
      <div className="statistics mt-6 grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="card text-center  bg-base-100 shadow-xl">
          <div className="card-body">
            <h4 className="text-2xl">Total Parcels Booked</h4>
            <div className="flex items-center gap-3 justify-center">
              <BiPurchaseTagAlt className="text-4xl" />
              <CountUp
                className="text-4xl font-extrabold text-blue-600"
                end={parcel.length}
                duration={2}
              />
            </div>
          </div>
        </div>
        <div className="card text-center bg-base-100 shadow-xl">
          <div className="card-body  text-center">
            <h4 className="text-2xl">Total Parcels Delivered</h4>
            <div className="flex items-center gap-3 justify-center">
              <TbTruckDelivery className="text-4xl" />
              <CountUp
                className="text-4xl font-extrabold text-blue-600"
                end={deliveredParcels.length}
                duration={2}
              />
            </div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body  text-center">
            <h4 className="text-2xl">Total Registered Users</h4>
            <div className="flex items-center gap-3 justify-center">
              <IoPeopleSharp className="text-4xl" />
              <CountUp
                className="text-4xl font-extrabold text-blue-600"
                end={users.length}
                duration={2}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
