import { Sequelize } from "sequelize-typescript";
import Ingredient from "./models/Ingredient";
import Opinion from "./models/Opinion";
import Recipe from "./models/Recipe";
import Unit from "./models/Unit";
import User from "./models/User";
import Category from "./models/Category";
import Step from "./models/Step";

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
        User,
        Category,
        Step
    ],
    timezone: "+01:00",  
});