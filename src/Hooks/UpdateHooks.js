import { toast } from "react-toastify";

const UpdateHooks = async (url, data) => {
  fetch(url, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
     
      if (data.status === "success") {
        console.log("updated")
      } else if (data.status === "fail") {
        console.log("something wrong")
      }
    })
    .catch((err) => {
      toast( err);
    });
};

export default UpdateHooks;
