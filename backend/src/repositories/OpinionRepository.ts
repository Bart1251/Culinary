import { BaseRepository } from "./BaseRepository";
import Opinion from "../models/Opinion";

export class OpinionRepository extends BaseRepository<Opinion> {
  constructor() {
    super(Opinion);
  }

}