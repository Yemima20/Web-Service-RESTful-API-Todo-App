const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    title: { type: String, required: true},
    description: { type: String },
    completed: { type: Boolean, required: true, default: false},
  }, {
    timestamps: true,
    collection: "todo_list",
  }
);

const Todo = mongoose.model("todo_list", todoSchema);

module.exports = {
  Todo
};