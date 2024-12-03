import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "./../../../Hooks/useAxiosSecure";
import { Authcontext } from "../../../Providers/AuthProviders";
import Swal from "sweetalert2";
import React from "react";
import Coffety from "../../../Components/Coffeti/Coffety";
// import { useHistory } from 'react-router-dom';



function CheckOut({ due, id }) {
  const { user } = useContext(Authcontext);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements(); // useElements hook should be used correctly
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState();
    const axiosSecure = useAxiosSecure();
    //  const history = useHistory();
  useEffect(() => {
    axiosSecure.post("/create-payment-intent", { price: due }).then((res) => {
      console.log(res.data.clientSecret);
      setClientSecret(res.data.clientSecret);
    });
  }, []);

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement); // Use elements.getElement to get the CardElement

    if (card == null) {
      return;
    }

    // Rest of the payment handling code here
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }
    const { paymentIntent, err } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.name || "anonymous",
          },
        },
      }
    );
    if (err) {
      console.log("Confirm error");
    } else {
      if (paymentIntent.status === "succeeded") {
        const assigningData = {
          paymentStatus: "paid",
        };

        try {
          const res = await axiosSecure.patch(
            `/parcelsAssign/${id}`,
            assigningData
          );
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: "Success!",
              text: `${"$" + due} has been paid`,
              icon: "success",
            });
              setPaymentSuccess(true);
            //    history.push("/dashboard/coffety");
          }
        } catch (error) {
          console.error("Error updating parcel:", error);
        }
      }
    }
  };

  return (
    <div>
      {paymentSuccess && <Coffety />}
      <form onSubmit={handlePayment}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "26px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          type="submit"
          className="btn btn-primary mt-4"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
      </form>
      <p className="text-xl text-red-600 mt-3">{error}</p>
      {/* <Coffety></Coffety> */}
    </div>
  );
}

export default CheckOut;
