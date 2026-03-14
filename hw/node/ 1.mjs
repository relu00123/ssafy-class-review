import express from "express";
import morgan from "morgan";
import http from "http";

const PORT = 8000;

const app = express();
app.use(morgan("dev"));
app.use(express.json());

const userData = {
    name: "david",
    age: 30,
    skills: {
        client: ["vue.js"],
        server: ["django", "express"],
    },
};


app.get("/api/v1/get-express", (req, res) => {

    try {
        return res.json({
            result : userData.skills.server[1] ,
        }
        );
    } 
    
    catch (error) {
        return res.json({
            error : "undefined",
        })
    }
});

const server = http.createServer(app);
server.listen(PORT, () => console.log("server is listening.."));