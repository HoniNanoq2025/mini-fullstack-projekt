import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RecipeDetails from "../../components/RecipeDetails/RecipeDetails";
import styles from "./RecipeDetailsPage.module.css";

export default function RecipeDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:3000/recipes/${id}`);

        if (!res.ok) {
          throw new Error("Recipe not found");
        }

        const data = await res.json();
        setRecipe(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return <div className={styles.message}>Loading recipe...</div>;
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.error}>{error}</p>
        <button onClick={() => navigate("/")} className={styles.backButton}>
          Back to Recipes
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button onClick={() => navigate("/")} className={styles.backButton}>
        ← Back to Recipes
      </button>
      <RecipeDetails recipe={recipe} />
    </div>
  );
}
