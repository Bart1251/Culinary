import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName: "category", timestamps: false})
class Category extends Model<Category> {
    @Column({type: DataType.STRING, allowNull: false})
    name: string;
}

export default Category;