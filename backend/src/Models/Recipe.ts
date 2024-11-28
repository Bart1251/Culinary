import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName: "recipe", timestamps: false})
class Recipe extends Model {
    @Column({type: DataType.STRING, allowNull: false})
    name!: string;
    @Column({type: DataType.STRING, allowNull: false})
    email!: string;
    @Column({type: DataType.STRING, allowNull: false})
    password!: string;
}

export default Recipe;