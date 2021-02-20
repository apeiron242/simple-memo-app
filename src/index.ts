import express from "express";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import auth from "./routes/auth";
import post from "./routes/post";

declare module "express-session" {
  export interface SessionData {
    user: any;
  }
}

const app: express.Application = express();
const PORT = process.env.PORT || 3001;
const MySQLStore = require("express-mysql-session")(session);
const option = {
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
};
const sessionStore = new MySQLStore(option);

require("dotenv").config();
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("client/build"));
app.use(cookieParser());
app.set("trust proxy", 1);
app.use(
  session({
    secret: "subscribe",
    proxy: true,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);
app.use("/", auth);
app.use("/", post);

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
