import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName: "unit", timestamps: false})
class Unit extends Model<Unit> {
    @Column({type: DataType.STRING, allowNull: false})
    name: string;
}

export default Unit;