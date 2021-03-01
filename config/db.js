"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("mysql"));
require("dotenv").config();
var option = {
    user: process.env.user,
    host: process.env.host,
    database: process.env.database,
    password: process.env.password,
};
var db = mysql_1.default.createConnection(option);
exports.default = db;
