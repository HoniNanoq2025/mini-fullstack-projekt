import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Recipes from "./pages/Recipes/Recipes";
import FormPage from "./pages/FormPage/FormPage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage/RecipeDetailsPage";
import styles from "./App.module.css";

export default function App() {
  return (
    <Router>
      <div className={styles.app}>
        <nav className={styles.navbar}>
          <NavLink to="/" className={styles.link}>
            RECIPES
          </NavLink>
          <NavLink to="/add-recipe" className={styles.link}>
            ADD RECIPE
          </NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<Recipes />} />
          <Route path="/add-recipe" element={<FormPage />} />
          <Route path="/recipes/:id" element={<RecipeDetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
}
