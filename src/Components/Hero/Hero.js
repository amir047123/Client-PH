import React from "react";
import { FilePlus2 } from "lucide-react";
import hero from "../../assets/Hero/heroImage.png";
import buttonImageOne from "../../assets/Hero/hero button.png";
import auth from "../../Firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Hero() {
  const [user] = useAuthState(auth);

  const handleAddRecipeClick = () => {
    if (!user) {
      toast("Please log in to add recipes.");
    } else {
      // If logged in, let the Link component handle the navigation
      console.log("Navigating to add recipe page");
    }
  };

  return (
    <div className="container mx-auto">
      <div className="md:flex justify-center items-center">
        <div className="md:w-1/2">
          <div className="flex flex-col gap-5">
            <h1 className="text-5xl font-bold text-black">
              Savor the Flavor
              <br /> Explore, Cook, <span className="text-primary">Enjoy!</span>
            </h1>
            <p>Dive into a world of culinary wonders with FlavorFusion.</p>
            <div className="flex justify-start items-center gap-5">
              <Link to="recipe">
                <button className="inline-flex items-center justify-center h-12 gap-2 px-6 hover:bg-black text-sm font-medium tracking-wide text-white transition duration-300 rounded-full focus-visible:outline-none whitespace-nowrap bg-primary hover:bg-primary-700 hover:scale-105">
                  <span>See Recipes</span>
                </button>
              </Link>
              <p className="">Add Recipes</p>
              <div
                className="bg-primary p-3 text-white rounded-full cursor-pointer transition duration-300 ease-in-out hover:scale-105 hover:bg-black"
                onClick={handleAddRecipeClick}
              >
                {user ? (
                  <Link to="/user-dashboard/add-recipe">
                    <FilePlus2 />
                  </Link>
                ) : (
                  <FilePlus2 />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-1/3 mt-8 md:mt-0 flex flex-col justify-center relative">
          <img src={hero} className="w-[400px]" alt="Hero Image" />

          <div className="flex justify-center items-center gap-5 absolute bottom-5 left-8">
            <div className="border p-2 flex justify-center items-center gap-2 bg-secondary rounded-md ring-primary ring-1">
              <img src={buttonImageOne} className="w-11" alt="Spicy Noodles" />
              <p>Spicy Noodles</p>
            </div>
            <div className="border p-2 flex justify-center items-center gap-2 bg-secondary rounded-md  ring-primary ring-1">
              <img
                src={buttonImageOne}
                className="w-11"
                alt="Vegetarian Salad"
              />
              <p>Vegetarian Salad</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
