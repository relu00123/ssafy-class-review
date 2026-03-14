import express from "express";
import http from "http";
import morgan from "morgan";

const app = express();
app.use(morgan("dev"));
app.use(express.json());

const PORT = 8000;

const members = [
  {
    id: "david123",
    username: "데이비드",
    phone_number: "010-1234-5678",
  },
  {
    id: "nana777",
    username: "나나",
    phone_number: "010-6666-7777",
  },
  {
    id: "jinsu454",
    username: "박진수",
    phone_number: "010-1212-1212",
  },
];


app.get("/api/v1/members" , (req, res) => {
    try {
        return res.json({
            members : members,
        });
    } catch(error) {
        return res.json({
            error : "오류 발생",
        });
    }
});

app.get("/api/v1/members/:id", (req, res) => {
    try {
        const id = req.params.id;

        const found = members.filter((element) => {
            return element.id === id;
        });

        if (found.length === 0) {
            const error = new Error("아이디에 해당하는 사용자를 찾을 수 없습니다.");
            error.status = 404;
            throw error;
        }

        else {
            return res.json({
                member : found
            });
        }

    } catch (error) {
        
        return res.status(error.status || 500).json({
            message : error.message,
        });

    }
});

const server = http.createServer(app);
server.listen(PORT, () => {console.log("server is listening...")});