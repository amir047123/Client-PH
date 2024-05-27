import React from "react";
import TabsLgPill from "./TabsLgPill";

export default function AddRecipes() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center uppercase">Add Recipe</h1>
      <div className="bg-white shadow-md rounded-md p-6">
        <TabsLgPill />
      </div>
    </div>
  );
}
