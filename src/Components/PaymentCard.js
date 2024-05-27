import React, { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import pricingPaymentPostHook from "../Hooks/pricingPaymentPostHook";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../Firebase/Firebase";
import { toast } from "react-toastify";

const PaymentCard = ({ plan }) => {

  const [user] = useAuthState(auth);
const [data,setData]=useState([]);
useEffect(()=>{
fetch(`http://localhost:5000/api/v1/user/by-email?email=${user?.email}`).then(res=>res.json()).then(data=>setData(data?.data))
},[user])

  const tokenHandler = (token) => {
    const pricingPaymentDetails = {
      token,
      price: plan?.price,
      plan,
      userName: user?.displayName,
    };
    pricingPaymentPostHook(
      "http://localhost:5000/api/v1/payment/addPayment",
      pricingPaymentDetails,data?._id,{coin:data?.coin+plan?.coin}
    );
  };

  const handlePurchaseClick = () => {
    if (!user) {
      toast.error("You need to be logged in to make a purchase!");
    }
  };
  return (
    <div className="flex flex-col gap-6 p-6 text-slate-400 border">
      <h3 className="text-xl font-bold  text-primary">
        {plan.type}
        <span className="block text-sm font-normal text-slate-400">
          {plan.description}
        </span>
      </h3>
      <h4>
        <span className="text-3xl text-primary">$</span>
        <span className="text-5xl font-bold tracking-tighter transition-all duration-300 text-slate-700 lg:text-6xl">
          {plan.price}
        </span>
      </h4>
      {user ? (
        <StripeCheckout
          amount={plan?.price * 100}
          shippingAddress
          token={tokenHandler}
          currency="USD"
          stripeKey="pk_test_51L1TVtFBIaSlFfNXVsw7wg2WrEnZ7w8b0amGGpxAiJT7sns5U0VhzfKI57g3Pdd0alwzvLSyZDeaQJPRT88ieIif00GQdQn6kg"
        >
          <button className="inline-flex items-center justify-center w-full h-12 gap-2 px-6 text-sm font-medium tracking-wide hover:bg-black ease-in-out hover:scale-105 text-white transition duration-300 rounded shadow-lg whitespace-nowrap bg-primary ">
            <span>PURCHASE</span>
          </button>
        </StripeCheckout>
      ) : (
        <button
          onClick={handlePurchaseClick}
          className="inline-flex items-center justify-center w-full h-12 gap-2 px-6 text-sm font-medium tracking-wide hover:bg-black ease-in-out hover:scale-105  text-white transition duration-300 rounded shadow-lg whitespace-nowrap bg-primary"
        >
          <span>PURCHASE</span>
        </button>
      )}
    </div>
  );
};

export default PaymentCard;
