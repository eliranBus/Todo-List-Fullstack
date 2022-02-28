import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

const PORT = process.env.PORT || 5000;
const todosFile = "./backend/assets/todos.json";

app.use(cors());

//get all todos
app.get("/todos", (req, res) => {
  fs.readFile(todosFile, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const todos = JSON.parse(data);

    return res.json(todos);
  });
});

//change single todo isComplete status
app.post("/todo/:id/complete", (req, res) => {
  fs.readFile(todosFile, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const todos = JSON.parse(data);
    const id = req.params.id;

    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id == id) {
        todos[i].isComplete = !todos[i].isComplete;
      }
    }

    fs.writeFile(todosFile, JSON.stringify(todos), () => {
      return res.send({ status: "ok" });
    });
  });
});

//post a new todo
app.post("/todo", (req, res) => {
  fs.readFile(todosFile, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const todos = JSON.parse(data);

    const ids = todos.map((todo) => {
      return todo.id;
    });

    const maxId = Math.max.apply(null, ids);

    todos.push({
      id: maxId + 1,
      name: req.body.name,
      isComplete: false,
    });

    fs.writeFile(todosFile, JSON.stringify(todos), () => {
      return res.send({ status: "ok" });
    });
  });
});

//delete a todo
app.post("/todo/:id/delete", (req, res) => {
  fs.readFile(todosFile, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const todos = JSON.parse(data);
    const id = req.params.id;
    let index;

    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id == id) {
        index = i;
      }
    }

    todos.splice(index, 1);

    fs.writeFile(todosFile, JSON.stringify(todos), () => {
      return res.send({ status: "ok" });
    });
  });
});

//Filter only completed todos
app.get("/todos/completed", (req, res) => {
  fs.readFile(todosFile, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const todos = JSON.parse(data);
    let completedTodos = [];

    for (let i = 0; i < todos.length; i++) {
      if (todos[i].isComplete === true) {
        completedTodos.push(todos[i]);
      }
    }

    return completedTodos;
  });
});

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

app.listen(PORT, console.log(`Server running on port ${PORT}`));
