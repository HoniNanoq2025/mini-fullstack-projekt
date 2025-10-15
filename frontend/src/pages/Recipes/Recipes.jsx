import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import RecipeList from "../../components/RecipeList/RecipeList";
import Pagination from "../../components/Pagination/Pagination";
import styles from "./Recipes.module.css";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const fetchRecipes = useCallback(async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:3000/recipes/search/${search}?page=${page}&limit=20`
        );

        const data = await res.json();
        setRecipes(data.recipes || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [search, page]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const handleSearch = (value) => {
    setSearchParams({ search: value, page: 1 });
  };
  const handlePageChange = (newPage) => {
    setSearchParams({ search, page: newPage });
  };

  return (
    <div className={styles.container}>
      <h1>Recipes</h1>
      <div className={styles.recipeContainer}>
        <SearchBar searchTerm={search} setSearchTerm={handleSearch} />

        {loading ? (
          <p className={styles.loading}>Loading recipes</p>
        ) : (
          <RecipeList recipes={recipes} />
        )}

        <Pagination
          page={page}
          setPage={handlePageChange}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
