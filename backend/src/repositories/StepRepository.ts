import { BaseRepository } from "./BaseRepository";
import Step from "../models/Step";

export class StepRepository extends BaseRepository<Step> {
  constructor() {
    super(Step);
  }
}