const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { Todo } = require("../models/todos");

// handle authentication --> verify JWT
router.use((req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader ? authHeader.split(" ")[1] : null;

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET, (error, decodedToken) => {
    if (error) return res.sendStatus(403);
    req.user = decodedToken.userId;
    next();
  });
});

// Get all todos data from database
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user });
    res.json({ todos });
  } catch (error) {
    res.status(500).json({ message: "Failed to get all todos" });
  }
});

// Create a new todo
router.post("/new", async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const userId = req.user;
    const todo = new Todo({ title, description, completed, userId });
    const saveTodo = await todo.save();
    res.status(201).json({ message: "Successfully created a new todo!", todo: saveTodo });
  } catch (error) {
    res.status(400).json({ message: "Failed to create a new todo!" });
  }
});

// See detail of a todo
router.get("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    todo.userId != req.user ? res.status(403).json({ message: "Forbidden. Cannot enter other user's todo" })
    : res.json({ message: "Successfully viewed todo details!", todo });
  } catch (error) {
    res.status(404).json({ message: "Not found. Failed to view todo details!" });
  }
});

// Update a todo by id
router.patch("/:id", async (req, res) => {
  try {
    const updateTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    updateTodo.userId != req.user ? res.status(403).json({ message: "Forbidden. Cannot update other user's todo" })
    : res.json({ message: "Successfully changed the todo data!", todo: updateTodo });
  } catch (error) {
    res.status(400).json({ message: "Not found. Failed to change todo data!" });
  }
});

// Delete todo by id
router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    !todo ? res.status(404).json({ message: "Todo not found" })
    : todo.userId.toString() !== req.user.toString() ? res.status(403).json({ message: "Forbidden. Cannot delete other user's todo" })
    : res.json({ message: "Successfully deleted todo!", todo });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete todo!" });
  }
});

// Delete all todos
router.delete("/", async (req, res) => {
  try {
    await Todo.deleteMany({ userId: req.user });
    res.json({ message: "Successfully deleted all todos" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete all todos" });
  }
});

// export router
module.exports = router;