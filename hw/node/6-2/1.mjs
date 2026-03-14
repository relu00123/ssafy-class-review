import express from "express";
import http from "http";
import morgan from "morgan";

const app = express();
app.use(morgan("dev"));
app.use(express());

const PORT = 8000;

app.get("/api/v1/gugu/:num1/:num2/:result", (req, res) => {
    try {
        const num1 = Number(req.params.num1);
        const num2 = Number(req.params.num2);
        const result = Number(req.params.result);

        // 오류상황
        if (num1 < 2 || num1 > 9 || num2 < 2 || num2 > 9) 
        {
            const error = new Error("구구단은 2 부터 9 까지입니다");
            error.status = 400;
            throw error;
        }

        // 정상 상황
        // 1. 답인경우
        else if (num1 * num2 === result)  {
            res.status(200).json({
                message : "정답입니다!"
            })
        }

        // 2. 답이 아닌 경우
        else {
            res.status(200).json({
                message : `틀렸습니다! 정답은 ${num1 * num2} 입니다.`,
            });
        }
    }

    catch (error) {
        res.status(error.status || 400).json({
            error : error.message,
        })
    }
});

const server = http.createServer(app);
server.listen(PORT, () => { console.log("server is listening...")});