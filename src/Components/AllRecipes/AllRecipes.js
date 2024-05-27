import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import axios from "axios";
import Loading from "../../Shared/Loading/Loading";

export default function AllRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/recipes/getRecipes"
        );
        const fetchedRecipes = response.data.data;

        const allCategories = fetchedRecipes
          .map((recipe) => recipe.category)
          .filter((category) => category);

        const uniqueCategories = [...new Set(allCategories)];
        setCategories(uniqueCategories);

        setRecipes(fetchedRecipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSearchResults([]); 
  };

  const handleSearch = () => {
    const results = recipes.filter((recipe) => {
      const titleMatch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
      const categoryMatch = recipe.category.toLowerCase().includes(searchQuery.toLowerCase());
      const countryMatch = recipe.country.toLowerCase().includes(searchQuery.toLowerCase());
      return titleMatch || categoryMatch || countryMatch;
    });
    setSearchResults(results);
  };
  
  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  const categoryCounts = {};
  recipes.forEach((recipe) => {
    if (!categoryCounts[recipe.category]) {
      categoryCounts[recipe.category] = 1;
    } else {
      categoryCounts[recipe.category]++;
    }
  });

  const updateRecipeInParentComponent = (updatedRecipe) => {
    // Update the recipes state with the updated recipe
    const updatedRecipes = recipes.map((recipe) =>
      recipe._id === updatedRecipe._id ? updatedRecipe : recipe
    );
    setRecipes(updatedRecipes);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto py-10 px-4 lg:px-0">
      <h1 className="text-2xl font-bold">All Recipes</h1>
      {/* Search input */}
      <div className="relative my-6">
        <input
          id="id-s03"
          type="search"
          name="id-s03"
          placeholder="Search here title, category & country"
          aria-label="Search content"
          className="relative w-full h-10 px-4 pr-12 text-sm transition-all border rounded outline-none focus-visible:outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-2.5 right-4 h-5 w-5 cursor-pointer stroke-slate-400 peer-disabled:cursor-not-allowed"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
          aria-label="Search icon"
          role="graphics-symbol"
          onClick={handleSearch}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        {searchQuery && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-2.5 right-12 h-5 w-5  stroke-slate-400 peer-disabled:cursor-not-allowed cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
            aria-label="Clear icon"
            role="graphics-symbo l"
            onClick={clearSearch}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div
          className="lg:block lg:col-span-1   ring-primary ring-1   bg-white shadow-md rounded-lg p-4"
          style={{ height: "calc(100vh - 80px)" }}
        >
          <h2 className="text-lg font-semibold mb-4 uppercase">Categories</h2>
          <ul>
            {categories.map((category) => (
              <li
                key={category}
                className={`mb-2 border p-2 ring-primary  ring-1  ${
                  selectedCategory === category ? "  bg-primary text-white " : ""
                } cursor-pointer`}
                onClick={() => handleCategoryClick(category)}
              >
                {category} ({categoryCounts[category] || 0})
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {searchResults.length > 0
              ? searchResults.map((recipe, index) => (
                  <RecipeCard key={index} recipe={recipe} />
                ))
              : recipes
                  .filter(
                    (recipe) =>
                      !selectedCategory ||
                      recipe.category === selectedCategory
                  )
                  .map((recipe, index) => (
                    <RecipeCard key={index} recipe={recipe}   updateRecipeInParentComponent={updateRecipeInParentComponent}
                    />
                  ))}
          </div>
        </div>
      </div>
    </div>
  );
}
