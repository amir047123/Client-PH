import React, { useEffect, useState } from "react";
import logo from "../../assets/Logo/Logo.png";
import { HandCoins, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import {
  useAuthState,
  useSignInWithGoogle,
  useSignOut,
} from "react-firebase-hooks/auth";
import auth from "../../Firebase/Firebase";
import { toast } from "react-toastify";
import CountUp from "react-countup";

export default function Navbar() {
  const [signOut] = useSignOut(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState(null);

  const handleSignUp = async () => {
    await signInWithGoogle().then((data) => {
      const name = data?.user?.displayName;
      const img = data?.user?.photoURL;
      const email = data?.user?.email;

      const info = { email: email, img: img, name: name, coin: 50 };
      fetch("http://localhost:5000/api/v1/user/addUser", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(info),
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("accessToken", data?.token);
          toast("Login Successful");
        });
    });
  };

  const loadUserData = (email) => {
    fetch(`http://localhost:5000/api/v1/user/by-email?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setUserData(data.data);
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

  return (
    <>
      <div className="border-b border-slate-200 bg-primary">
        <div className="mx-auto grid w-full max-w-full grid-cols-4 gap-6 px-6 py-2 text-sm text-slate-500 md:grid-cols-8 lg:max-w-5xl lg:grid-cols-12 xl:max-w-7xl 2xl:max-w-[96rem]">
          <div className="col-span-2 flex items-center md:col-span-4 lg:col-span-6">
            <div className="flex items-center gap-2 transition-colors duration-300 hover:text-black cursor-pointer text-white">
              <Phone />
              +880175071998
            </div>
          </div>
          <div className="col-span-2 flex items-center justify-end gap-6 md:col-span-4 lg:col-span-6">
            <div className="flex items-center justify-end gap-4 text-white">
              <MapPin /> Khulna , Bangladesh
            </div>
          </div>
        </div>
      </div>

      <header className="relative z-20 w-full border-b border-primary bg-white/90 shadow-md shadow-slate-700/5 after:absolute after:left-0 after:top-full after:z-10 after:block after:h-px after:w-full after:bg-slate-200 lg:border-slate-200 lg:backdrop-blur-sm lg:after:hidden">
        <div className="relative mx-auto max-w-full px-6 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[96rem]">
          <nav
            aria-label="main navigation"
            className="flex h-[5.5rem] items-stretch justify-between font-medium text-slate-700"
            role="navigation"
          >
            <Link
              id="WindUI"
              aria-label="WindUI logo"
              aria-current="page"
              className="flex items-center gap-2 whitespace-nowrap py-3 text-lg focus:outline-none lg:flex-1"
              to="/"
            >
              <img src={logo} alt="logo" className="w-20" />
            </Link>

            <button
              className={`relative order-10 block h-10 w-10 self-center lg:hidden ${
                isToggleOpen
                  ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(2)]:-rotate-45 [&_span:nth-child(3)]:w-0 "
                  : ""
              }`}
              onClick={() => setIsToggleOpen(!isToggleOpen)}
              aria-expanded={isToggleOpen ? "true" : "false"}
              aria-label="Toggle navigation"
            >
              <div className="absolute left-1/2 top-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
                ></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"
                ></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
                ></span>
              </div>
            </button>

            <ul
              role="menubar"
              aria-label="Select page"
              className={`absolute left-0 top-0 z-[-1] h-[28.5rem] w-full justify-center overflow-hidden overflow-y-auto overscroll-contain bg-white/90 px-8 pb-12 pt-24 font-medium transition-[opacity,visibility] duration-300 lg:visible lg:relative lg:top-0 lg:z-0 lg:flex lg:h-full lg:w-auto lg:items-stretch lg:overflow-visible lg:bg-white/0 lg:px-0 lg:py-0 lg:pt-0 lg:opacity-100 ${
                isToggleOpen
                  ? "visible opacity-100 backdrop-blur-sm"
                  : "invisible opacity-0"
              }`}
            >
              <li role="none" className="flex items-stretch">
                <Link
                  role="menuitem"
                  aria-haspopup="false"
                  className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600 focus:outline-none focus-visible:outline-none lg:px-8"
                  to="/"
                >
                  <span>Home</span>
                </Link>
              </li>

              <li role="none" className="flex items-stretch">
                <Link
                  role="menuitem"
                  aria-haspopup="false"
                  className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600 focus:outline-none focus-visible:outline-none lg:px-8"
                  to="/recipe"
                >
                  <span>Recipe</span>
                </Link>
              </li>
              {user && (
                <li role="none" className="flex items-stretch">
                  <Link
                    role="menuitem"
                    aria-haspopup="false"
                    className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600 focus:outline-none focus-visible:outline-none lg:px-8"
                    to="/user-dashboard/add-recipe"
                  >
                    <span>Add Recipes</span>
                  </Link>
                </li>
              )}
            </ul>

            <div className="ml-auto flex items-center justify-end px-6 lg:ml-0 lg:flex-1 lg:p-0 gap-3">
              {user ? (
                <>
                  <img
                    src={user?.photoURL}
                    className="w-8 h-8 rounded-full cursor-pointer"
                    alt="User Profile"
                    title={user?.displayName}
                  />
                  <button
                    onClick={async () => {
                      await signOut();
                      localStorage.removeItem("accessToken");
                      toast("Sign Out successful");
                      window.location.reload();
                    }}
                    className="text-slate-700 hover:border-primary  hover:bg-primary hover:text-white transition duration-150 p-1 rounded-md"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={handleSignUp}
                  className="text-slate-700 hover:border-primary rounded-md hover:shadow transition duration-150 flex justify-center items-center gap-1 p-1 hover:bg-primary hover:text-white "
                >
                  <img
                    src="https://www.svgrepo.com/show/355037/google.svg"
                    className="w-5 h-5"
                    alt="Google Icon"
                  />
                  Sign In
                </button>
              )}
              <a
                href="#"
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-lg text-emerald-500"
              >
                <HandCoins size={23} />
                <span className="absolute -right-1.5 -top-1.5 inline-flex items-center justify-center gap-1 rounded-full border-2 border-white bg-pink-500 px-1.5 text-sm text-white">
                  <CountUp end={userData?.coin} duration={2}></CountUp>
                  <span className="sr-only"> new items </span>
                </span>
              </a>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
