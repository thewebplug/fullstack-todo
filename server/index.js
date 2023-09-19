import express from "express";
import sql from "./db.js";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to the todo list backend");
});

app.get("/api/getthings", async (req, res) => {
  const todos = await sql`SELECT * FROM todos`;
  if (todos) {
    res.status(200).send(todos);
  } else {
    res.status(404).send("Error here!");
  }
});

app.post("/api/acceptthings", async (req, res) => {
  const { task, is_completed } = req.body;
  // const task = req.body.task;
  // const is_completed = req.body.is_completed;
  const acceptItems =
    await sql`INSERT INTO todos (task, is_completed) VALUES (${task}, ${is_completed}) RETURNING *`;
  if (acceptItems) {
    res.status(201).send(acceptItems);
  } else {
    res.status(500).send("Internal server Error");
  }
});





app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
