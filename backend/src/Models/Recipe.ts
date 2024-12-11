import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import User from "./User";
import Category from "./Category";
import Ingredient from "./Ingredient";
import Step from "./Step";
import Opinion from "./Opinion";

@Table({tableName: "recipe", timestamps: true})
class Recipe extends Model<Recipe> {
    @Column({type: DataType.STRING, allowNull: false})
    name: string;
    @Column({type: DataType.STRING, allowNull: false})
    description: string;
    @Column({type: DataType.STRING, allowNull: true})
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

    @HasMany(() => Ingredient, { onDelete: "CASCADE" })
    ingredients: Ingredient[];

    @HasMany(() => Step, { onDelete: "CASCADE" })
    steps: Step[];

    @HasMany(() => Opinion, { onDelete: "CASCADE" })
    opinions: Opinion[];
}

export default Recipe;