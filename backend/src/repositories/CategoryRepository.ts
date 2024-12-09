import { BaseRepository } from "./BaseRepository";
import Category from "../models/Category";

export class CategoryRepository extends BaseRepository<Category> {
  constructor() {
    super(Category);
  }

}