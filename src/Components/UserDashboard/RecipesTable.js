import React, { useState, useEffect } from "react";
import { Trash } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../Firebase/Firebase";

export default function RecipesTable() {
  const [recipes, setRecipes] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/recipes/specific/?fieldName=user&fieldValue=${user.email}`
        );
        setRecipes(response.data.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, [user]);

  const handleDelete = async (_id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/v1/recipes/deleteRecipes/${_id}`
      );

      setRecipes(recipes.filter((recipe) => recipe._id !== _id));

      toast.success("Recipe deleted successfully!");
    } catch (error) {
      console.error("Error deleting recipe:", error);
      toast.error("Failed to delete recipe. Please try again later.");
    }
  };

  return (
    <div>
      <div className="rounded-lg border border-gray-200">
        <div className="overflow-x-auto rounded-t-lg">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Title
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Category
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Country
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {recipes.map((recipe) => (
                <tr key={recipe._id}>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {recipe.title}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {recipe.category}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {recipe.country}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    <button
                      onClick={() => handleDelete(recipe._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
