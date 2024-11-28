import path from "path";
import { Sequelize } from "sequelize-typescript";

export const sequlize = new Sequelize({
    dialect: "mysql",
    username: "root",
    password: "",
    database: "culinary",
    models: [path.join(__dirname, "./Models")],
    timezone: "+01:00",  
});