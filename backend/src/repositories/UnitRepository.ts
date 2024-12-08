import { BaseRepository } from "./BaseRepository";
import Unit from "../models/Unit";

export class UnitRepository extends BaseRepository<Unit> {
  constructor() {
    super(Unit);
  }

}