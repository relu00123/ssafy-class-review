import { error } from "console";
import express from "express";
import http from "http";
import morgan from "morgan";
import { isSymbolObject } from "util/types";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

const PORT = 8000;

const rotbot_pos = {
    y : 0,
    x : 0
}

function isOOB(y, x) {
    if (y < 0  || y >= 4 || x < 0 || x >= 4)
    {
        throw new Error("oob");
    }
    return false; 
}

app.get("/api/v1/move/:dir", (req, res) => {
    try {
        const dir = req.params.dir;

        if (dir === "left") {

            if (!isOOB(rotbot_pos.y, rotbot_pos.x - 1))
            rotbot_pos.x -= 1;

            return res.json({
                location : { 
                    y : rotbot_pos.y,
                    x : rotbot_pos.x
                }
            });
        }

        else if (dir === "right") {

            if (!isOOB(rotbot_pos.y, rotbot_pos.x + 1)) 
            rotbot_pos.x += 1;

             return res.json({
                location : { 
                    y : rotbot_pos.y,
                    x : rotbot_pos.x
                }
            });
        }

        else if (dir === "up") {

            if (!isOOB(rotbot_pos.y - 1, rotbot_pos.x))
            rotbot_pos.y -= 1;

             return res.json({
                location : { 
                    y : rotbot_pos.y,
                    x : rotbot_pos.x
                }
            });
        }

        else if (dir == "down") {
            if (!isOOB(rotbot_pos.y + 1, rotbot_pos.x))
            rotbot_pos.y += 1;

             return res.json({
                location : { 
                    y : rotbot_pos.y,
                    x : rotbot_pos.x
                }
            });
        }

    } catch (error) {
        return res.json({
            error : "갈 수 없는 곳",
            location : {
                y : rotbot_pos.y,
                x : rotbot_pos.x
            }
        });

    }
});

const server = http.createServer(app);
server.listen(PORT, () => { console.log("server is listening...")});

