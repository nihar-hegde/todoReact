const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 3000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const Todos = mongoose.model("Todos", todoSchema);

mongoose.connect(
  "mongodb+srv://niharhegde163:niharhegde@cluster0.oxu62rs.mongodb.net"
);

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await Todos.find({});

    res.send({ status: "ok", data: allTodos });
  } catch (error) {
    console.log("Error");
  }
});

app.post("/todos", async (req, res) => {
  const newTodo = {
    title: req.body.title,
    description: req.body.description,
  };
  const addTodo = new Todos(newTodo);
  await addTodo.save();
  res
    .status(201)
    .json({ message: "successfully created:", todoID: newTodo._id });
});

app.put("/todos/:id", async (req, res) => {
  const updateTodo = await Todos.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (updateTodo) {
    res.status(200).json({ message: "Updated succesfully" });
  } else {
    res.status(404).json({ message: "todo not found" });
  }
});

app.delete("/todos/:id", async (req, res) => {
  await Todos.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: "deleted the todo succesfully" });
});

app.listen(PORT, () => {
  console.log(`Listening on prot ${PORT}`);
});
