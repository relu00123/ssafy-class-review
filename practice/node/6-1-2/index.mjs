import express from "express";
import morgan from "morgan";
import http from "http";
import cors from "cors";

const app = express();
const PORT = 8000;

app.use(morgan("dev"));

app.use(express.json());

app.use(cors());

app.get("/api/v1/hello-world", (req, res) => {
  try {
    return res.json({
      text: "안녕 Express.js",
    });
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
});

const server = http.createServer(app);

server.listen(PORT, () => console.log(`This server is listening on ${PORT}`));

