import express from "express";
import morgan from "morgan";
import http from "http";

const app = express(); 
const PORT = 8000;

app.use(morgan("dev"));
app.use(express());

app.get("/api/v1/job/:jobname", (req, res) => {
    try {
        const jobname = req.params.jobname;
        if (jobname === "student") {
            return res.json({
                result : "안녕하세요"
            });
        }

        else if (jobname === "teacher") {
            return res.json({
                result : "반갑습니다"
            });
        }

        else {
            return res.json( {
                result : "누구십니까"
            });
        }
    } 
    catch (error) {
        return res.json({
            error : error
        });
    }
});

const server = http.createServer(app);
server.listen(PORT, () => console.log("server is listening"));



