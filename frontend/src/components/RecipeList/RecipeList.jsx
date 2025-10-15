import RecipeCard from "../RecipeCard/RecipeCard";
import styles from "./RecipeList.module.css";

export default function RecipeList({ recipes }) {
  if (!recipes.length) return <p className={styles.empty}>No recipes found!</p>;

  return (
    <div className={styles.grid}>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe._id} recipe={recipe} />
      ))}
    </div>
  );
}
