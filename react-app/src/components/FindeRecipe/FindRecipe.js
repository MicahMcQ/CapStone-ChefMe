import React, { useState, useEffect } from "react";
import './FindRecipe.css';
import axios from "axios";
import SearchBar from "../SearchBar/SearchBar";

function FindRecipe() {

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRecipes() {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:9000/recipes");
        setRecipes(response.data);
        setLoading(false);
      } catch (error) {
        setError("Request failed. Please check your Internet connection and try again.");
        setLoading(false);
      }
    }

    fetchRecipes();
  }, []);

  return(
    <body>
<div>
  <SearchBar />
<h2>Recipe List</h2>
{loading ? (
  <p>Loading...</p>
) : error ? (
  <p>{error}</p>
) : (
  <ul>
    {recipes.map((recipe, index) => (
      <li key={index}>{recipe.name}</li>
    ))}
  </ul>
)}
</div>
</body>
  )
}

export default FindRecipe
