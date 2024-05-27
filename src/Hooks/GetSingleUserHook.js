import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../Firebase/Firebase";
import { toast } from "react-toastify";

export default function GetSingleUserHook() {
  const [user] = useAuthState(auth);
  const [singleUserData, setSingleUserData] = useState(null);

  const loadUserData = (email) => {
    fetch(`http://localhost:5000/api/v1/user/by-email?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setSingleUserData(data.data);
        } else {
          toast("Failed to load user data");
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        toast("Error fetching user data");
      });
  };

  useEffect(() => {
    if (user?.email) {
      loadUserData(user.email);
    }
  }, [user]);

  return singleUserData;
}
