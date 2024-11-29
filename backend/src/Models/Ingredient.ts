import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import Unit from "./Unit";
import Recipe from "./Recipe";

@Table({tableName: "ingredient", timestamps: false})
class Ingredient extends Model<Ingredient> {
    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @Column({type: DataType.FLOAT, allowNull: false})
    amount: number;

    @ForeignKey(() => Unit)
    @Column({type: DataType.INTEGER, allowNull: false})
    unitId: number;
    @BelongsTo(() => Unit)
    unit: Unit;

    @ForeignKey(() => Recipe)
    @Column({type: DataType.INTEGER, allowNull: false})
    recipeId: number;
    @BelongsTo(() => Recipe)
    recipe: Recipe;
}

export default Ingredient;