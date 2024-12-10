import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import Ingredient from "./Ingredient";

@Table({tableName: "unit", timestamps: false})
class Unit extends Model<Unit> {
    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @HasMany(() => Ingredient)
    ingredients: Ingredient[];
}

export default Unit;