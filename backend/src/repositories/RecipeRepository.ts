import { BaseRepository } from "./BaseRepository";
import Recipe from "../models/Recipe";

export class RecipeRepository extends BaseRepository<Recipe> {
  constructor() {
    super(Recipe);
  }

}