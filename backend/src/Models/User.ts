import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName: "user", timestamps: false})
class User extends Model {
    @Column({type: DataType.STRING, allowNull: false})
    username!: string;
    @Column({type: DataType.STRING, allowNull: false})
    email!: string;
    @Column({type: DataType.STRING, allowNull: false})
    password!: string;
}

export default User;