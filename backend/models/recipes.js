// Import mongoose library, used to define schema and work with MongoDB
const mongoose = require("mongoose");

// Define Schema for recipes collection with validation
const myRecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"], // Field must be filled out
    minLength: [2, "Title must contain at least 2 characters"], // min. title length
  },
  description: {
    type: String,
    required: [true, "Description in required"],
    minLength: [20, "Description must contain at least 20 characters"],
  },
  prepTime: {
    type: Number,
    required: [true, "Preparation time in minutes is required"],
    min: [1, "Recipes must have prep time of at least 1 minute"],
  },
  cookTime: {
    type: Number,
    required: [true, "Cooking time in minutes is required"],
    default: "None",
  },
  totalTime: {
    type: Number,
    required: [
      true,
      "Total of Prep + cooking/freezing time in minutes is required",
    ],
    min: [1, "Recipes must have totalTime of at least 1 minute"],
  },
  ingredients: {
    type: [String],
    validate: {
      validator: (arr) => arr.length > 0,
      message: "You must add at least one ingredient",
    },
  },
  directions: {
    type: String,
    required: [true, "Directions are required"],
    minLength: [10, "Directions must contain at least 10 characters"],
  },
});
