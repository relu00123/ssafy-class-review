import express from "express";
import http from "http";
import morgan from "morgan";

const app = express();
app.use(morgan("dev"));
app.use(express.json());

const PORT = 8000;

const operations = ["add", "subtract", "multiply", "divide"];

app.get("/api/v1/calc/:mode/:num1/:num2", (req, res) => {

    try {
        const mode = req.params.mode;
        const num1 = Number(req.params.num1);
        const num2 = Number(req.params.num2);

        if (! mode in operations) {

            const error = new Error("사용법을 다시 참고하세요.")
            error.status = 400;
            throw error;
        }

        if (mode === "divide") 
        {
            if (num2 === 0) {
                const error = new Error("0 으로 나누기는 불가능합니다.");
                error.status = 400;
                throw error;
            }

            return res.json({
                result : num1 / num2,
            })
        }

        else if (mode === "add") {
            return res.json({
                result : num1 + num2,
            });

        }

        else if (mode === "subtract") {
            return res.json({
                result : num1 - num2,
            });
        }

        else if (mode === "multiply") {
            return res.json({
                result : num1 * num2,
            });
        }
    }

    catch (error) {
        return res.status(error.status || 500).json({
            error : error.message,
        });
    }
});

const server = http.createServer(app);
server.listen(PORT, console.log("server is listening..."));