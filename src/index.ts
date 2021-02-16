import express from "express";
import mysql from "mysql";
import cors from "cors";

const app: express.Application = express();
const PORT = 3001 || process.env.PORT;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("client/build"));

require("dotenv").config();

const db: mysql.Connection = mysql.createConnection({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
});

app.get("/post", (req: express.Request, res: express.Response) => {
  db.query("SELECT * FROM posts", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.post("/post", (req: express.Request, res: express.Response) => {
  const memo: string = req.body.memo;

  db.query(`INSERT INTO posts (memo) VALUES (?)`, [memo], (err) => {
    if (err) {
      console.log(err);
      res.send("err");
    } else {
      res.send("ok");
    }
  });
});

app.delete("/delete/:id", (req: express.Request, res: express.Response) => {
  const id: string = req.params.id;

  db.query(`DELETE FROM posts WHERE id = ${id}`, (err) => {
    if (err) {
      res.send("err");
    } else {
      res.send("ok");
    }
  });
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
