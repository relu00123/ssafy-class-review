import express from "express";
import http from "http";
import morgan from "morgan";

const app = express();
const PORT = 8000;

app.use(morgan("dev"));
app.use(express.json());

app.get("/api/v1/time/:time", (req, res) => {
    
    try {

        const time = req.params.time;

        if (time < 0 || time > 23)  {
            throw new Error("wrong time");
        }

        else if (6 <= time && time <= 11)  {
            return res.json({
                message : "Good morning!",
            })

        }

        else if (12 <= time && time <= 17) {
            return res.json({
                message : "Good afternoon!",
            })

        }

        else if (18 <= time && time <= 22) {
            return res.json({
                message : "Good evening!",
            })

        }

        else if (23 <= time || time <= 5) {
            return res.json({
                message : "Good night!",
            })
        }

    } catch (error) {

        return res.json({
            error : "잘못된 시간입니다."
        });
    }
});

const server = http.createServer(app);
server.listen(PORT, () => { console.log("server is listening...")});