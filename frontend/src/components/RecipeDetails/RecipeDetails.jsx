import styles from "./RecipeDetails.module.css";

export default function RecipeDetails({ recipe }) {
  if (!recipe) return null;

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.header}>
        {recipe.image && (
          <img src={recipe.image} alt={recipe.title} className={styles.image} />
        )}
        <div className={styles.headerInfo}>
          <h1 className={styles.title}>{recipe.title}</h1>
          {recipe.description && (
            <p className={styles.description}>{recipe.description}</p>
          )}

          <div className={styles.metaInfo}>
            {recipe.cuisine && (
              <div className={styles.metaItem}>
                <strong>Cuisine:</strong> {recipe.cuisine}
              </div>
            )}
            {recipe.difficulty && (
              <div className={styles.metaItem}>
                <strong>Difficulty:</strong> {recipe.difficulty}
              </div>
            )}
            {recipe.servings && (
              <div className={styles.metaItem}>
                <strong>Servings:</strong> {recipe.servings}
              </div>
            )}
            {recipe.mealType && recipe.mealType.length > 0 && (
              <div className={styles.metaItem}>
                <strong>Meal Type:</strong> {recipe.mealType.join(", ")}
              </div>
            )}
          </div>

          <div className={styles.timeInfo}>
            {recipe.prepTimeMinutes && (
              <div className={styles.timeItem}>
                <strong>Prep Time:</strong> {recipe.prepTimeMinutes} min
              </div>
            )}
            {recipe.cookTimeMinutes && (
              <div className={styles.timeItem}>
                <strong>Cook Time:</strong> {recipe.cookTimeMinutes} min
              </div>
            )}
            {recipe.totalTimeMinutes && (
              <div className={styles.timeItem}>
                <strong>Total Time:</strong> {recipe.totalTimeMinutes} min
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.content}>
        {recipe.ingredients && recipe.ingredients.length > 0 && (
          <div className={styles.section}>
            <h2>Ingredients</h2>
            <ul className={styles.ingredientsList}>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
        )}

        {recipe.instructions && recipe.instructions.length > 0 && (
          <div className={styles.section}>
            <h2>Instructions</h2>
            <ol className={styles.instructionsList}>
              {recipe.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}