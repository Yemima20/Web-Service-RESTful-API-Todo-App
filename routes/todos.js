const express = require("express");
const router = express.Router();
const { Todo } = require("../models/todos");

// Get all todos data from database
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json({ todos });
  } catch (error) {
    res.status(500).json({ message: "Failed to get all todos" });
  }
});

// Create a new todo
router.post("/new", async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const todo = new Todo({ title, description, completed });
    const saveTodo = await todo.save();
    res.json({ message: "Successfully created a new todo!", todo: saveTodo });
  } catch (error) {
    res.status(400).json({ message: "Failed to create a new todo!" });
  }
});

// See detail of a todo
router.get("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    res.json({ message: "Successfully viewed todo details!", todo });
  } catch (error) {
    res.status(404).json({ message: "Failed to view todo details!" });
  }
});

// Update a todo by id
router.patch("/:id", async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({
      message: "Successfully changed the todo data!",
      todo: updatedTodo,
    });
  } catch (error) {
    res.status(400).json({ message: "Failed to change todo data!" });
  }
});

// Delete todo by id
router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Successfully deleted todo!", todo });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete todo!" });
  }
});

// Delete all todos
router.delete("/", async (req, res) => {
  try {
    await Todo.deleteMany({});
    res.json({ message: "Successfully deleted all todos" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete all todos" });
  }
});

// export router
module.exports = router;