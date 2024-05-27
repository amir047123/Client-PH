import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import axios from "axios";
import { toast } from "react-toastify";
import auth from "../../Firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import GetSingleUserHook from "../../Hooks/GetSingleUserHook";
export default function AddRecipesForm() {
  const [title, setTitle] = useState("");
  const [recipeImage, setRecipeImage] = useState(null);
  const [youtubeVideo, setYoutubeVideo] = useState("");
  const [country, setCountry] = useState("");
  const [category, setCategory] = useState("");
  const [recipeDetails, setRecipeDetails] = useState("");
  const inputFileRef = useRef(null);
  const [user] = useAuthState(auth);
  const singleUserData = GetSingleUserHook();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const imgBBResponse = await uploadImageToImgBB(recipeImage);

      const imageUrl = imgBBResponse.data.data.url;

      const formData = {
        title,
        recipeImage: imageUrl,
        youtubeVideo,
        country,
        category,
        recipeDetails,
        user: user.email,
        userId: singleUserData._id,
        userName:user.displayName,
      };

      const response = await axios.post(
        "http://localhost:5000/api/v1/recipes/addRecipes",
        formData,{
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          }
        }
      );

      toast.success("Recipe added successfully!");
      setTitle("");
      setRecipeImage(null);
      setYoutubeVideo("");
      setCountry("");
      setCategory("");
      setRecipeDetails("");
      inputFileRef.current.value = null;
    } catch (error) {
      console.error("Error posting data:", error);
      toast.error("Failed to add recipe. Please try again later.");
    }
  };

  const uploadImageToImgBB = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await axios.post(
        "https://api.imgbb.com/1/upload?key=b111c4e726718eb5e46c7e54ce2204fa",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response;
    } catch (error) {
      throw new Error("Error uploading image to imgBB:", error);
    }
  };

  return (
    <div>
      <div className="">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              className="mt-1 block w-full border p-3"
              placeholder="Type your recipe title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Upload Recipe Image
            </label>
            <input
              type="file"
              name="recipeImage"
              accept="image/*"
              className="mt-1 block w-full border p-3"
              onChange={(e) => setRecipeImage(e.target.files[0])}
              ref={inputFileRef}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              YouTube Video Link
            </label>
            <input
              type="text"
              name="youtubeVideo"
              className="mt-1 block w-full border p-3"
              placeholder="YouTube video link"
              value={youtubeVideo}
              onChange={(e) => setYoutubeVideo(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <input
              type="text"
              name="country"
              className="mt-1 block w-full border p-3"
              placeholder="Type your country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              name="category"
              className="mt-1 block w-full border p-3"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              <option value="Rice Dishes">Rice Dishes</option>
              <option value="Fish Dishes">Fish Dishes</option>
              <option value="Meat Dishes">Meat Dishes</option>
              <option value="Street Food">Street Food</option>
              <option value="Snacks">Snacks</option>
              <option value="Sweets and Desserts">Sweets and Desserts</option>
              <option value="Bread and Naan">Bread and Naan</option>
              <option value="Vegetarian Dishes">Vegetarian Dishes</option>
              <option value="Spicy Curries">Spicy Curries</option>
              <option value="Beverages">Beverages</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Recipe Details
            </label>
            <JoditEditor
              value={recipeDetails}
              onChange={(newContent) => setRecipeDetails(newContent)}
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-500 text-white font-bold rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
