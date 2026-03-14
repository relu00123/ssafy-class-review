import express from "express";
import morgan from "morgan";
import http from "http";

const app = express();
const PORT = 8000;


app.get("/api/v1/password/:pw1/:pw2", (req, res) => {
    try {
        const pw1 = req.params.pw1;
        const pw2 = req.params.pw2;
        let ret;
        if (pw1 === pw2) 
            ret = true;
        else
            ret = false;

        return res.json({
            result : ret,
        });
    }

    catch (error) {

        return res.json({
            error : error.message,
        });
    }
});

const server = http.createServer(app);
server.listen(PORT, () => console.log("server is listening.."));