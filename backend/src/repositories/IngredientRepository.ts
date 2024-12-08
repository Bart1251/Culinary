import { BaseRepository } from "./BaseRepository";
import Ingredient from "../models/Ingredient";

export class IngredientRepository extends BaseRepository<Ingredient> {
  constructor() {
    super(Ingredient);
  }

}