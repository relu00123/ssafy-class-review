import express from "express";
import morgan from "morgan";
import http from "http";

const app = express();
app.use(morgan("dev"));
app.use(express.json());

const PORT = 8000;
let lastIdx = 3;

const todos = [
  {
    id: 1,
    title: "밥먹기",
    isComplete: false,
  },
  {
    id: 2,
    title: "영화보기",
    isComplete: true,
  },
  {
    id: 3,
    title: "게임하기",
    isComplete: false,
  },
];

app.get("/api/v1/todos", (req, res) => {
    try {
        return res.json({
            todos: todos,
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
});

app.get("/api/v1/todos/:id", (req, res) => {
    try {
        const id = Number(req.params.id);

        const found = todos.find((todo) => todo.id === id);

        if (!found) {
            const error = new Error("Id does not exist");
            error.status = 404;
            throw error;
        }

        return res.json({
            todo: found,
        });

    } catch (error) {
        return res.status(error.status || 500).json({
            error: error.message,
        });
    }
});

app.post("/api/v1/todos", (req, res) => {
    try {
        const todo = req.body;

        if (!todo.title || todo.title.trim() === "") {
            const error = new Error("title 을 입력해야 합니다.");
            error.status = 400;
            throw error;
        }

        if (typeof todo.isComplete !== "boolean") {
            const error = new Error("isComplete 값은 true 또는 false 여야 합니다.");
            error.status = 400;
            throw error;
        }

        lastIdx += 1;
        todo.id = lastIdx;
        todos.push(todo);

        return res.status(201).json({
            todo: todo,
        });

    } catch (error) {
        return res.status(error.status || 500).json({
            error: error.message,
        });
    }
});

app.patch("/api/v1/todos/:id", (req, res) => {
    try {
        const id = Number(req.params.id);
        const found = todos.find((todo) => todo.id === id);

        if (!found) {
            const error = new Error("Id does not exist");
            error.status = 404;
            throw error;
        }

        const { title, isComplete } = req.body;

        if (title !== undefined) {
            if (title.trim() === "") {
                const error = new Error("title 을 입력해야 합니다.");
                error.status = 400;
                throw error;
            }
            found.title = title;
        }

        if (isComplete !== undefined) {
            if (typeof isComplete !== "boolean") {
                const error = new Error("isComplete 값은 true 또는 false 여야 합니다.");
                error.status = 400;
                throw error;
            }
            found.isComplete = isComplete;
        }

        return res.status(200).json({
            todo: found,
        });

    } catch (error) {
        return res.status(error.status || 500).json({
            error: error.message,
        });
    }
});

app.delete("/api/v1/todos/:id", (req, res) => {
    try {
        const id = Number(req.params.id);

        const index = todos.findIndex((todo) => todo.id === id);

        if (index === -1) {
            const error = new Error("Id does not exist");
            error.status = 404;
            throw error;
        }

        todos.splice(index, 1);

        return res.status(204).json();

    } catch (error) {
        return res.status(error.status || 500).json({
            error: error.message,
        });
    }
});

const server = http.createServer(app);
server.listen(PORT, () => {
    console.log("server is listening...");
});