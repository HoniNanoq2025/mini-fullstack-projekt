// Import mongoose library, used to define schema and work with MongoDB
const mongoose = require("mongoose");

// Define Schema for recipes collection with validation
const myRecipeSchema = new mongoose.Schema(
  {
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
    servings: {
      type: Number,
      required: [true, "Number of servings is required"],
      min: [1, "Recipes must provide at least one serving"],
    },
    prepTimeMinutes: {
      type: Number,
      required: [true, "Preparation time in minutes is required"],
      min: [1, "Recipes must have prep time of at least 1 minute"],
    },
    cookTimeMinutes: {
      type: Number,
      required: [true, "Cooking time in minutes is required"],
      min: [0, "Write 0 if it doesn't require any cooking time"],
    },
    totalTimeMinutes: {
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
    instructions: {
      type: [String],
      validate: {
        validator: (arr) => arr.length > 0,
        message: "You must add at least one instruction",
      },
    },
    mealType: {
      type: [String],
      validate: {
        validator: (arr) => arr.length > 0,
        message: "You must at least one meal type (e.g. Lunch, Snack, Dinner)",
      },
    },
    cuisine: {
      type: String,
      required: [
        true,
        "You need to indicate the type of cuisine (e.g. Italian)",
      ],
      minLength: [4, "cuisine must contain at least 4 characters"],
    },
    difficulty: {
      type: String,
      required: [true, "You need to indicate the difficulty (e.g. Medium)"],
      minLength: [4, "Difficulty must contain at least 4 characters"],
    },
    image: {
      type: String,
      default: "", // If no URL, then default setting is empty
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", myRecipeSchema);
