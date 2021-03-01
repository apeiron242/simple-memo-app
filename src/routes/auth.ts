import express, { Router } from "express";
import bcrypt from "bcrypt";
import db from "../config/db";
const router: Router = express.Router();

router.post(
  "/register",
  (req: express.Request, res: express.Response): void => {
    const username: string = req.body.newUsername;
    const password: string = req.body.newPassword;

    db.query(
      `SELECT * FROM auth WHERE username = ?`,
      username,
      (err, result) => {
        if (err) {
          console.log(err);
        }
        if (result.length > 0) {
          res.send("exist");
        } else {
          bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
              console.log(err);
            }

            db.query(
              "INSERT INTO auth (username, password) VALUES (?, ?)",
              [username, hash],
              (err) => {
                if (err) {
                  console.log(err);
                  res.send("err");
                } else {
                  res.send("working");
                }
              }
            );
          });
        }
      }
    );
  }
);

router.get("/login", (req, res): void => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

router.post("/login", (req: express.Request, res: express.Response): void => {
  const username: string = req.body.username;
  const password: string = req.body.password;

  if (password) {
    db.query(
      "SELECT * FROM auth WHERE username = ?",
      username,
      async (err, result) => {
        if (err) {
          console.log(err);
          res.send("err");
        } else {
          if (result) {
            bcrypt.compare(
              password,
              result[0].password,
              async (err, response) => {
                if (err) {
                  console.log(err);
                }
                if (response) {
                  req.session.user = await result;
                  await req.session.save((err) => {
                    if (err) {
                      console.log(err);
                    }
                  });
                  await res.send(result);
                } else {
                  res.send("Wrong Username or Password");
                }
              }
            );
          } else {
            res.send("User doesn't exist");
          }
        }
      }
    );
  }
});

router.post("/logout", (req: express.Request, res: express.Response): void => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
  });
});

export default router;
