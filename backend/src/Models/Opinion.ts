import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import Recipe from "./Recipe";
import User from "./User";

@Table({tableName: "opinion", timestamps: true})
class Opinion extends Model<Opinion> {
    @Column({type: DataType.STRING, allowNull: false})
    content: string;

    @ForeignKey(() => Recipe)
    @Column({type: DataType.INTEGER, allowNull: false})
    recipeId: number;
    @BelongsTo(() => Recipe, { onDelete: "CASCADE" })
    recipe: Recipe;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    userId: number;
    @BelongsTo(() => User)
    user: User;
}

export default Opinion;