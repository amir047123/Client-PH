
// UserRoutes.js
import AddRecipes from "../Components/UserDashboard/AddRecipes";
import UserDashboard from "../Components/UserDashboard/UserDashboard";

const UserRoutes = [
  // The base path for the user dashboard should be handled by the main Routes configuration
  { path: "user-dashboard", Component: UserDashboard }, // This path is handled as the index route for /userDashboard
  { path: "add-recipe", Component: AddRecipes },

];

export { UserRoutes };
