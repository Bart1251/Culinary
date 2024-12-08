import path from "path";
import { Sequelize } from "sequelize-typescript";
import Ingredient from "./models/Ingredient";
import Opinion from "./models/Opinion";
import Recipe from "./models/Recipe";
import Unit from "./models/Unit";
import User from "./models/User";

export const sequlize = new Sequelize({
    dialect: "mysql",
    username: "root",
    password: "",
    database: "culinary",
    models: [
        Ingredient,
        Opinion,
        Recipe,
        Unit,
        User
    ],
    timezone: "+01:00",  
});