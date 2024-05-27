import axios from "axios";
import { Earth, Table } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Loading from "../../Shared/Loading/Loading";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [relatedRecipes, setRelatedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/recipes/getRecipesById/${id}`
        );
        setRecipe(response.data.data);

        if (response.data.data) {
          const relatedResponse = await axios.get(
            `http://localhost:5000/api/v1/recipes/specific/?fieldName=category&fieldValue=${encodeURIComponent(
              response.data.data.category
            )}`
          );
          setRelatedRecipes(relatedResponse.data.data);
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen p-4">
      <section>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-8 lg:grid-cols-12">
            {/* Recipe Details */}
            <div className="col-span-1 md:col-span-8 lg:col-span-7 bg-white  rounded-lg shadow-md">
              <div className="flex justify-start items-center gap-5 p-2">
                <div className="flex justify-center items-center gap-2">
                  <Earth className="text-primary" size={20} />
                  <p className="text-md">{recipe.country}</p>
                </div>
                ||
                <div className="flex justify-center items-center gap-2">
                  <Table className="text-primary" size={20} />
                  <p className="text-md">{recipe.category}</p>
                </div>
                ||
                <p>{recipe?.userName} </p>
                ||
                <p>{recipe?.userName} </p>
              </div>
              <div className="p-4 ">
                {recipe && (
                  <>
                    <h1 className="text-xl font-bold mb-4">{recipe.title}</h1>
                    <div className="mb-4">
                      <div className="h-64 w-full overflow-hidden rounded-md">
                        <img
                          src={recipe?.recipeImage}
                          alt="Recipe"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div
                      className="text-sm"
                      dangerouslySetInnerHTML={{
                        __html: recipe.recipeDetails,
                      }}
                    />
                  </>
                )}
              </div>
            </div>

            {/* Related Recipes Section */}
            <div className="col-span-1 md:col-span-8 lg:col-span-5 border p-5 rounded-md bg-white">
              <div
                className="relative"
                style={{ width: "100%", height: "254px" }}
              >
                {" "}
                {/* Adjust height as needed */}
                {recipe && (
                  <iframe
                    src={recipe.youtubeVideo}
                    frameBorder="0"
                    allowFullScreen
                    className="w-full h-full"
                    title="Recipe Video"
                    style={{ width: "100%", height: "100%" }}
                  ></iframe>
                )}
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Related Recipes</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {relatedRecipes.map((relatedRecipe) => (
                    <div
                      key={relatedRecipe._id}
                      className="bg-white p-3 rounded-lg shadow-md"
                    >
                      <Link
                        to={`/recipe-details/${relatedRecipe._id}`}
                        className="block"
                      >
                        <div className="h-24 w-full overflow-hidden rounded-md mb-2">
                          <img
                            src={relatedRecipe.recipeImage}
                            alt={relatedRecipe.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="text-sm font-medium mb-1">
                          {relatedRecipe.title}
                        </h3>
                        <div className=" flex justify-between items-center">
                          <p className="text-xs text-gray-600">
                            {relatedRecipe.category}
                          </p>
                          <p className=" hover:text-primary">view</p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RecipeDetails;
