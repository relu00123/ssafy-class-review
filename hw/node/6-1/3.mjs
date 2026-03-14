import express from "express";
import http from "http";
import morgan from "morgan";


const PORT = 8000;
const app = express();

app.use(morgan("dev"));
app.use(express.json());


app.get("/api/v1/odd-even/:number", (req, res) => {
    try {
        const number = Number(req.params.number);
        // 짝수라면
        if (number %2 === 0) {
            return res.json({
                result : number * 2,
            });
        }

        // 홀수라면
        else {
            return res.json({
                result : number * 3,
            });
        }
    } catch (error) {
        return res.json({
            error : error
        });
    }
});

const server = http.createServer(app);
server.listen(PORT, () => { console.log("server is listening")});

