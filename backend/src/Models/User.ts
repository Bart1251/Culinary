import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import Recipe from "./Recipe";
import Opinion from "./Opinion";

@Table({tableName: "user", timestamps: false})
class User extends Model<User> {
    @Column({type: DataType.STRING, allowNull: false})
    username!: string;
    @Column({type: DataType.STRING, allowNull: false})
    email!: string;
    @Column({type: DataType.STRING, allowNull: false})
    password!: string;

    @HasMany(() => Recipe)
    recipes: Recipe[];

    @HasMany(() => Opinion)
    opinions: Opinion[];
}

export default User;