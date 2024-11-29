import { Column, DataType, Model, Table } from "sequelize-typescript";

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
}

export default Recipe;