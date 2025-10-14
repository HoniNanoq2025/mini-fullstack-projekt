const express = require("express"); // Import express
const mongoose = require("mongoose"); // Import mongoose
const cors = require("cors"); // Import CORS
require("dotenv").config(); // Load environment from .env

const Recipe = require("./models/recipes"); // Import MyRecipes model
const app = express();

// ------ MIDDLEWARE --------
app.use(express.json());
app.use(cors());

// ------ MongoDB CONNECTION --------
mongoose
  .connect(process.env.URI)
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.error("MongoDB connection error", err));

// ================ Recipes CRUD Endpoints ================

// CREATE
app.post("/recipes", async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);
    const saved = await newRecipe.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ
app.get("/recipes", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const total = await Recipe.countDocuments();
    const recipes = await Recipe.find()
      .skip((page - 1) * limit)
      .limit(limit);
    const totalPages = Math.ceil(total / limit);
    res.json({ recipes, totalPages, currentPage: page });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/recipes/search/:title", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const search = req.query.search || "";
    const query = search ? { title: { $regex: search, $options: "i" } } : {};
    const total = await Recipe.countDocuments(query);
    const recipes = await Recipe.find(query)
      .skip((page - 1) * limit)
      .limit(limit);
    const totalPages = Math.ceil(total / limit);
    res.json({ recipes, totalPages, currentPage: page });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/recipes/:id", async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) return res.status(404).json({ message: "Recipe not found" });
  res.json(recipe);
});

// UPDATE
app.put("/recipes/:id", async (req, res) => {
  try {
    const updated = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) return res.status(404).json({ error: "Recipe not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.patch("/recipes/:id", async (req, res) => {
  const updated = await Recipe.findByIdAndUpdate(
    req.params.id,
    { $set: req.body }, // $set means only sent fields are updated
    { new: true, runValidators: true } // runValidators checks that data is following your Schema (e.g. that servings is a number) - Good protection against invalid data
    // No "new: true" database is updated correctly, but API returns old(obsolete) data to the user
    // With "new: true" user gets correct, updated data instantly!
  );
  if (!updated) return res.status(404).json({ message: "Recipe not found" });
  res.json(updated);
});

// DELETE
app.delete("/recipes/:id", async (req, res) => {
  try {
    const deleted = await Recipe.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ error: "Recipe not found" });
    res.json({ message: "Recipe deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// START SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
