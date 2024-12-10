import { Model, ModelStatic, Transaction } from "sequelize";

export class BaseRepository<T extends Model> {
    protected model: ModelStatic<T>;

    constructor(model: ModelStatic<T>) {
        this.model = model;
    }

    async create(data: Partial<T["_attributes"]>, options?: { transaction?: Transaction }): Promise<T> {
        return this.model.create(data as T["_attributes"], options);
    }

    async findById(id: number | string): Promise<T | null> {
        return this.model.findByPk(id);
    }

    async findAll(options?: object): Promise<T[]> {
        return this.model.findAll(options);
    }

    async update(id: number | string, data: Partial<T["_attributes"]>): Promise<[number, T[]]> {
        return this.model.update(data, {
            where: { id } as any,
            returning: true,
        });
    }

    async delete(id: number | string): Promise<number> {
        return this.model.destroy({
            where: { id } as any,
        });
    }
}