import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import User from "./User";
import Category from "./Category";

@Table({tableName: "recipe", timestamps: true})
class Recipe extends Model<Recipe> {
    @Column({type: DataType.STRING, allowNull: false})
    name: string;
    @Column({type: DataType.STRING, allowNull: false})
    description: string;
    @Column({type: DataType.STRING, allowNull: false})
    imagePath: string;
    @Column({type: DataType.INTEGER, allowNull: false})
    difficulty: number;
    @Column({type: DataType.INTEGER, allowNull: false})
    prepareTime: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    userId: number;
    @BelongsTo(() => User)
    user: User;

    @ForeignKey(() => Category)
    @Column({type: DataType.INTEGER, allowNull: false})
    categoryId: number;
    @BelongsTo(() => Category)
    category: Category;
}

export default Recipe;