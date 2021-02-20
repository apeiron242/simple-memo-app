import express, { Router } from "express";
import mysql from "mysql";
const router: Router = express.Router();

require("dotenv").config();

const option = {
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
};

const db: mysql.Connection = mysql.createConnection(option);

router.get("/post/:id", (req: express.Request, res: express.Response) => {
  const id: string = req.params.id;
  db.query(`SELECT * FROM posts WHERE username = ?`, id, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

router.post("/post", (req: express.Request, res: express.Response): void => {
  const memo: string = req.body.memo;
  const username: string = req.body.userId;

  db.query(
    `INSERT INTO posts (memo, username) VALUES (?, ?)`,
    [memo, username],
    (err) => {
      if (err) {
        console.log(err);
        res.send("err");
      } else {
        res.send("ok");
      }
    }
  );
});

router.delete(
  "/delete/:id",
  (req: express.Request, res: express.Response): void => {
    const id: string = req.params.id;

    db.query(`DELETE FROM posts WHERE id = ${id}`, (err) => {
      if (err) {
        res.send("err");
      } else {
        res.send("ok");
      }
    });
  }
);

router.delete(
  "/deleteall/:id",
  (req: express.Request, res: express.Response): void => {
    const username: string = req.params.id;

    db.query(`DELETE FROM posts WHERE username = ?`, username, (err) => {
      if (err) {
        console.log(err);
        res.send("err");
      } else {
        res.send("ok");
      }
    });
  }
);

export default router;
