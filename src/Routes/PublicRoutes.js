import RecipeDetails from "../Components/UserDashboard/RecipeDetails";
import Coins from "../Pages/Coins";
import Recipe from "../Pages/Recipe";

const PublicRoutes = [
  // { path: "/", Component: Home },
  
  { path: "/recipe", Component: Recipe },
  { path: "/coins", Component: Coins },

  { path: "recipe-details/:id", Component: RecipeDetails },

];

export { PublicRoutes };
