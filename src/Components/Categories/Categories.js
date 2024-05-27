import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import CountUp from "react-countup";

// Assuming you have imported your category images correctly
import CategoriesImage1 from "../../assets/Categories/Rice.png";
import CategoriesImage2 from "../../assets/Categories/fish.png";
import CategoriesImage3 from "../../assets/Categories/meat.png";
import { Link } from "react-router-dom";

export default function Categories() {
  const [categoriesData, setCategoriesData] = useState({
    rice: [],
    fish: [],
    meat: [],
  });

  useEffect(() => {
    fetch(
      "http://localhost:5000/api/v1/recipes/specific/?fieldName=category&fieldValue=Rice Dishes"
    )
      .then((response) => response.json())
      .then((data) => {
        setCategoriesData((prevData) => ({
          ...prevData,
          rice: data.data,
        }));
      })
      .catch((error) => {
        console.error("Error fetching Rice Dishes data:", error);
      });

    fetch(
      "http://localhost:5000/api/v1/recipes/specific/?fieldName=category&fieldValue=Fish Dishes"
    )
      .then((response) => response.json())
      .then((data) => {
        setCategoriesData((prevData) => ({
          ...prevData,
          fish: data.data,
        }));
      })
      .catch((error) => {
        console.error("Error fetching Fish Dishes data:", error);
      });

    fetch(
      "http://localhost:5000/api/v1/recipes/specific/?fieldName=category&fieldValue=Meat Dishes"
    )
      .then((response) => response.json())
      .then((data) => {
        setCategoriesData((prevData) => ({
          ...prevData,
          meat: data.data,
        }));
      })
      .catch((error) => {
        console.error("Error fetching Meat Dishes data:", error);
      });
  }, []);

  return (
    <div className=" mt-10">
      <div className=" text-center">
        <h1 className=" text-red-600 uppercase ">Favorites</h1>
        <h1 className=" text-3xl font-bold">
          Popular <span className=" text-primary">Categories</span>
        </h1>
      </div>

      <div className="flex flex-wrap lg:flex-nowrap justify-center items-center gap-6 py-10 px-4">
        <CategoryCard
          image={CategoriesImage1}
          title="Rice Dishes"
          count={categoriesData.rice.length}
        />
        <CategoryCard
          image={CategoriesImage2}
          title="Fish Dishes"
          count={categoriesData.fish.length}
        />
        <CategoryCard
          image={CategoriesImage3}
          title="Meat Dishes"
          count={categoriesData.meat.length}
        />
      </div>

      <div className="  flex justify-center">
        <Link to="recipe">
          <button class="inline-flex items-center ease-in-out hover:scale-105 justify-center h-10 gap-2 px-6 text-sm font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-primary hover:bg-black focus:bg-emerald-700 disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none">
            <span>View All Categories</span>
          </button>
        </Link>
      </div>
    </div>
  );
}

function CategoryCard({ image, title, count }) {
  return (
    <div className="flex flex-col justify-center items-center bg-white px-4 py-5 rounded-2xl shadow-md border w-full sm:w-1/2 md:w-1/3 lg:w-1/4 ring-primary ring-1">
      <div className="bg-customCardBg p-2 rounded-full ring-primary ring-1 ease-in-out hover:scale-105 ">
        <img src={image} alt={title} className=" " />
      </div>
      <div className="text-center mt-4">
        <Link to="recipe">
          <h1 className="font-bold cursor-pointer transition-all hover:scale-105">
            {title}
          </h1>
        </Link>

        <CountUp end={count} duration={20} />
      </div>
    </div>
  );
}
