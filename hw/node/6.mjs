import express from "express";
import morgan from "morgan";
import http from "http";

const app = express();
const PORT = 8000;

app.use(morgan("dev"));

app.use(express.json());

const location = {
  y: 0,
  x: 0,
};

app.get("/api/v1/move/:dir", (req, res) => {
  try {
    let ny = location.y;
    let nx = location.x;
    if (req.params.dir === "left") {
      nx--;
    } else if (req.params.dir === "right") {
      nx++;
    } else if (req.params.dir === "up") {
      ny--;
    } else if (req.params.dir === "down") {
      ny++;
    } else {
      return res.json({
        message: "잘못된 명령",
      });
    }
    if (ny >= 4 || nx >= 4 || ny < 0 || nx < 0) {
      return res.json({
        message: "갈 수 없는 곳",
        location: location,
      });
    }
    location.y = ny;
    location.x = nx;
    return res.json({
      location: location,
    });
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
});

const server = http.createServer(app);

server.listen(PORT, () => console.log(`This server is listening on ${PORT}`));
