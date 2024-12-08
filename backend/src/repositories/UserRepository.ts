import { BaseRepository } from "./BaseRepository";
import User from "../models/User";

export class UserRepository extends BaseRepository<User> {
    constructor() {
        super(User);
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.model.findOne({
            where: { email },
        });
    }
}