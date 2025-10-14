import { useState } from "react";
import styles from "./FormPage.module.css";

export default function FormPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [servings, setServings] = useState("");
  const [prepTimeMinutes, setPrepTimeMinutes] = useState("");
  const [cookTimeMinutes, setCookTimeMinutes] = useState("");
  const [totalTimeMinutes, setTotalTimeMinutes] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [mealType, setMealType] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  /*   const [error, setError] = useState(null); */

  // Function for handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents standard form behavior(reload)
    setLoading(true); // Loading is set to true
    setMessage(""); // Reset message

    const newRecipe = {
      title,
      description,
      servings: servings ? parseInt(servings, 10) : undefined,
      prepTimeMinutes: prepTimeMinutes
        ? parseInt(prepTimeMinutes, 10)
        : undefined,
      cookTimeMinutes: cookTimeMinutes
        ? parseInt(cookTimeMinutes, 10)
        : undefined,
      totalTimeMinutes: totalTimeMinutes
        ? parseInt(totalTimeMinutes, 10)
        : undefined,
      ingredients: ingredients
        ? ingredients.split(", ").map((ingredient) => ingredient.trim())
        : [], // Split into array
      instructions: instructions
        ? instructions.split(", ").map((i) => i.trim())
        : [], // Split into array
      mealType: mealType ? mealType.split(", ").map((m) => m.trim()) : [], // Split into array
      cuisine,
      difficulty,
      image,
    };

    try {
      const res = await fetch("http://localhost:3000/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecipe),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(
          errData.message || "Something went wrong when adding the recipe"
        );
      }

      const data = await res.json();
      setMessage(`The recipe ${data.title} has been added`);

      // Reset form
      setTitle("");
      setDescription("");
      setServings("");
      setPrepTimeMinutes("");
      setCookTimeMinutes("");
      setTotalTimeMinutes("");
      setIngredients("");
      setInstructions("");
      setMealType("");
      setCuisine("");
      setDifficulty("");
      setImage("");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Add a new recipe</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            minLength={2}
            placeholder="Add title of recipe..."
          />
        </label>
        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            minLength={20}
            placeholder="Describe your dish..."
          />
        </label>
        <label>
          Number of servings
          <input
            type="number"
            value={servings}
            onChange={(e) => setServings(e.target.value)}
            required
            placeholder="Number of servings..."
            min={1}
          />
        </label>
        <label>
          Preparation time (min.)
          <input
            type="number"
            value={prepTimeMinutes}
            onChange={(e) => setPrepTimeMinutes(e.target.value)}
            required
            placeholder="Prep time in minutes..."
            min={1}
          />
        </label>
        <label>
          Cook time (min.)
          <input
            type="number"
            value={cookTimeMinutes}
            onChange={(e) => setCookTimeMinutes(e.target.value)}
            required
            placeholder="Cooking time in minutes..."
            min={1}
          />
        </label>
        <label>
          Total time (min.)
          <input
            type="number"
            value={totalTimeMinutes}
            onChange={(e) => setTotalTimeMinutes(e.target.value)}
            required
            placeholder="Total time in minutes..."
          />
        </label>
        <label>
          Ingredients (comma separated)
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
            minLength={20}
            placeholder="Enter ingredients separated by commas (e.g. 200 g sugar, 500 g flour, 1 egg)..."
          />
        </label>
        <label>
          Instructions (comma separated)
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
            minLength={20}
            placeholder="Enter instructions separated by commas (e.g. mix, bake, serve)..."
          />
        </label>
        <label>
          Meal Type (comma separated)
          <input
            type="text"
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
            required
            placeholder="Add meal type (e.g. Lunch, Snack, Dinner)..."
          />
        </label>
        <label>
          Cuisine
          <input
            type="text"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            required
            placeholder="Add cuisine type (e.g. Italian)..."
          />
        </label>
        <label>
          Difficulty
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="Select difficulty"></option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
        <label>
          <input
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Add image url (e.g. https://example.com/image.jpg)..."
          />
        </label>

        <button type="submit" disabled={loading} className={styles.submitBtn}>
          {loading ? "Saving..." : "Add recipe"}
        </button>

        {message && <p className={styles.message}>{message}</p>}
      </form>
    </div>
  );
}
