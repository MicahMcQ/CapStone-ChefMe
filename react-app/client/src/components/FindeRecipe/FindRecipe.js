import React, { useState, useEffect } from "react";
import './FindRecipe.css';
import axios from "axios";


function FindRecipe() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isListVisible, setIsListVisible] = useState(false);
  const [buttonText, setButtonText] = useState("Show List");

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

  const toggleListVisibility = () => {
    setIsListVisible(!isListVisible);
    setButtonText(isListVisible ? "Show All" : "Hide All");
  };

  return (
    <div>
      <h2>Recipe List</h2>
      <button id="toggleButton" onClick={toggleListVisibility}>
        {buttonText}
      </button>
      <div id="image" className={isListVisible ? "visible" : "hidden"}>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div>
            {recipes.map((recipe, index) => (
              <div key={index} className="recipeThumbnail">
                <a href={recipe.source} target="_blank" rel="noopener noreferrer">
                  <img src={recipe.image} alt={recipe.name} />
                </a>
                <p>{recipe.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FindRecipe;
