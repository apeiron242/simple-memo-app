import mysql from "mysql";

require("dotenv").config();

const option = {
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
};

const db: mysql.Connection = mysql.createConnection(option);

export default db;
