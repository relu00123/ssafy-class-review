import express from "express";
import morgan from "morgan";
import http from "http";

const app = express();
const PORT = 8000;

app.use(morgan("dev"));

app.use(express.json());

const robotStatus = {
  // 1 / 0
  power: 1,
  // 1 / 0
  nightMode: 0,
  // 0 - 100
  speed: 0,
  // 0 - 100
  volume: 20,
  // 1: english / 2: french / 3: korean
  lang: 1,
};

app.get("/api/v1/settings", (req, res) => {
  try {
    return res.json({
      robot_status: robotStatus,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      error: error.message,
    });
  }
});

app.patch("/api/v1/settings/:option", (req, res) => {
  try {
    const option = req.params.option;
    const val = Number(req.body.val);
    let isValValid = true;

    if (option === "power") {
      if (val === 1 || val === 0) {
        robotStatus.power = val;
      } else {
        isValValid = false;
      }
    } else if (option === "night_mode") {
      if (val === 1 || val === 0) {
        robotStatus.nightMode = val;
      } else {
        isValValid = false;
      }
    } else if (option === "speed") {
      if (val >= 0 && val <= 100) {
        robotStatus.speed = val;
      } else {
        isValValid = false;
      }
    } else if (option === "volume") {
      if (val >= 0 && val <= 100) {
        robotStatus.volume = val;
      } else {
        isValValid = false;
      }
    } else if (option === "lang") {
      if (val >= 1 && val <= 3) {
        robotStatus.lang = val;
      } else {
        isValValid = false;
      }
    } else {
      const error = new Error("잘못된 option 입니다. 설명서를 확인하세요.");
      error.status = 400;
      throw error;
    }

    if (isValValid) {
      return res.json({
        message: `${option}을 ${val}로 변경 완료`,
        robot_status: robotStatus,
      });
    } else {
      const error = new Error("잘못된 val 입니다. 설명서를 확인하세요.");
      error.status = 400;
      throw error;
    }
  } catch (error) {
    return res.status(error.status || 500).json({
      error: error.message,
    });
  }
});

const server = http.createServer(app);

server.listen(PORT, () => console.log(`This server is listening on ${PORT}`));
