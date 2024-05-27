import { toast } from "react-toastify";
import UpdateHooks from "./UpdateHooks";

const pricingPaymentPostHook = async (url, data, id,upData) => {
  console.log(id,upData)
  await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(async (d) => {
      const url = `http://localhost:5000/api/v1/user/${id}`;
      if (d.status === "success") {
        await UpdateHooks(url, upData);
    
        toast("Payment Successfully Done");
      } else {
        toast(d?.error || "Something went wrong!");
      }
    });
};

export default pricingPaymentPostHook;
