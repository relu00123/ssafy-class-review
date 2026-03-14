import express from "express";
import http from "http";
import morgan from "morgan";

const app = express();
const PORT = 8000;

app.get("/api/v1/open", (req, res) => {
    try {
        return res.json({
            message : "문이 열렸습니다.",
        });

    } catch (error) {
        return res.json({
            message : error.message
        });
    }
});

app.get("/api/v1/close", (req, res) => {
    try {
        return res.json({
            message : "문이 닫혔습니다.",
        });

    } catch (error) {
        return res.json({
            message : error.message,
        });
    }
});

const server = http.createServer(app);
server.listen(PORT, () => { console.log("server is listening...")});