import http from "http";
import morgan from "morgan";
import express from "express";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

const PORT = 8000;

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
        return res.status(200).json({
            robot_status : robotStatus,
        });

    } catch (error) {

    }
});

const power = [1, 0];

app.patch("/api/v1/settings/:option", (req, res) => {

    try {
        const option = req.params.option;
        const val = Number(req.body.val);

        // 찾을 수가 없다면 
        if (! option in robotStatus) {

            const error = new Error("잘못된 option 입니다. 설명서를 확인하세요.");
            error.status = 400;
            throw error;
        }

        // Power option 확인 
        if (option === "power") {
            if (!power.includes(val)) {
                const error =  new Error("잘못된 val 입니다. 설명서를 확인하세요");
                error.status = 400;
                throw error;
            }

        }

        // 찾는 다면
        robotStatus[option] = val;

        return res.status(200).json({
            message : `${option}을 ${val}로 변경 완료`,
            robot_status : robotStatus
        });
        

    } catch(error) {
        return res.status(error.status || 500).json({
            error : error.message,
        });
    }
});

const server = http.createServer(app);
server.listen(PORT, () => { `server is listening on port ${PORT}`});


 