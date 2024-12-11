import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import Recipe from "./Recipe";

@Table({tableName: "step", timestamps: false})
class Step extends Model<Step> {
    @Column({type: DataType.STRING, allowNull: false})
    content: string;

    @ForeignKey(() => Recipe)
    @Column({type: DataType.INTEGER, allowNull: false})
    recipeId: number;
    @BelongsTo(() => Recipe, { onDelete: "CASCADE" })
    recipe: Recipe;
}

export default Step;