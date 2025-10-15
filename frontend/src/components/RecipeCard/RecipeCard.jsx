import { useNavigate, useParams } from "react-router-dom";
import styles from "./RecipeCard.module.css";

export default function RecipeCard({ recipe }) {
  const navigate = useNavigate();

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {recipe.image ? (
          <img src={recipe.image} alt={recipe.title} className={styles.image} />
        ) : (
          <div className={styles.noImage}>No recipe image</div>
        )}
      </div>

      <h3>{recipe.title}</h3>
      <div className={styles.info}>
        {recipe.servings && <p>Servings: {recipe.servings}</p>}
        {recipe.mealType && <p>Meal type: {recipe.mealType.join(", ")}</p>}
        {recipe.difficulty && <p>Difficulty: {recipe.difficulty}</p>}
        {recipe.cuisine && <p>Cuisine: {recipe.cuisine}</p>}
      </div>
      <div className={styles.description}>
        {recipe.description && <p>{recipe.description}</p>}
      </div>

      <button
        onClick={() => navigate(`/recipe/${recipe._id}`)}
        className={styles.readMore}
      >
        Read More
      </button>
    </div>
  );
}
