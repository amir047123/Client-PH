import React from "react";
import StripeCheckout from "react-stripe-checkout";
import PaymentCard from "../Components/PaymentCard";

export default function Coins() {
  // Fake data representing different plans
  const plans = [
    {
      type: "Basic",
      description: "buying 100 coins by spending 1 dollar.",
      price: 1,
      coin:100
    },
    {
      type: "Standard",
      description: " buying 500 coins by spending 5 dollars.       ",
      price: 5,
      coin:500
    },
    {
      type: "Premium",
      description: "1000 coins by spending 10 dollars.",
      price: 10,
      coin:1000
    },
  ];


  return (
    <div className=" my-10 px-10">
      <h1 className=" text-2xl text-center py-5 font-bold " >Purchase Coin</h1>
      <div className="flex justify-center items-center gap-5 ">
        {plans.map((plan, index) => (
          <PaymentCard key={index+2} plan={plan}/>
        ))}
      </div>
    </div>
  );
}
