import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import Recipe from "./Recipe";

@Table({tableName: "category", timestamps: false})
class Category extends Model<Category> {
    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @HasMany(() => Recipe)
    recipes: Recipe[];
}

export default Category;