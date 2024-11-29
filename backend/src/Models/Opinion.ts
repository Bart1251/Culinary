import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import Recipe from "./Recipe";

@Table({tableName: "opinion", timestamps: true})
class Opinion extends Model<Opinion> {
    @Column({type: DataType.STRING, allowNull: false})
    content: string;

    @ForeignKey(() => Recipe)
    @Column({type: DataType.INTEGER, allowNull: false})
    recipeId: number;
    @BelongsTo(() => Recipe)
    recipe: Recipe;

    @ForeignKey(() => Recipe)
    @Column({type: DataType.INTEGER, allowNull: false})
    userId: number;
    @BelongsTo(() => Recipe)
    user: Recipe;
}

export default Opinion;