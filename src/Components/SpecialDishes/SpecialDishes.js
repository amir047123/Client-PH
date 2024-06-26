import React, { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "../AllRecipes/RecipeCard";
import { Link } from "react-router-dom";
import Loading from "../../Shared/Loading/Loading";
export default function SpecialDishes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true); 


    // Effect to fetch recipes from the server when the component mounts
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          "https://serverrecipesharing.niroghealthplus.com/api/v1/recipes/getRecipes"
        );
        setRecipes(response.data.data.slice(0, 8));
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchRecipes();
  }, []);


    // Render a loading spinner while data is being fetched
  if (loading) {
    return <Loading />; 
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 mx-auto mt-10 flex flex-col gap-8">
      <div className="flex flex-col gap-5">
        <div>
          <div>
            <p className="uppercase text-red-600">Special Dishes</p>
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              Standout Recipes <br /> From{" "}
              <span className="text-primary">Our Categories</span>
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      </div>

      <div className="  flex justify-center">
        <Link to="recipe">
          <button class="inline-flex items-center ease-in-out hover:scale-105 justify-center h-10 gap-2 px-6 text-sm font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-primary hover:bg-black focus:bg-emerald-700 disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none">
            <span>View All Recipes</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
