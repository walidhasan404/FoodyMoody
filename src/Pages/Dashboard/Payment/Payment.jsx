import { useContext } from "react";
import { Authcontext } from "../../../Providers/AuthProviders";
import { useLoaderData, useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOut from "./CheckOut";
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY);
function Payment() {
     const { user } = useContext(Authcontext);
     const existParcel = useLoaderData();
   console.log(existParcel);
   const due = existParcel.price;
     const { id } = useParams();
  return (
    <div className=" mb-5">
      <div className="text-2xl text-center text-orange-500 bg-base-200 py-7">
        <p>Make a Payment</p>
      </div>
      <div className="divider"></div>
      <div className="flex justify-evenly">
        <p>Parcel Type: {existParcel.parcelType}</p>
        <p>Due: {existParcel.price} tk</p>
      </div>
      <div className="divider"></div>
      <div className="mx-auto mt-8 w-1/2">
        <Elements stripe={stripePromise}>
          <CheckOut due={due} id={id}></CheckOut>
        </Elements>
      </div>
    </div>
  );
}
export default Payment