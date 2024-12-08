"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitRepository = void 0;
const BaseRepository_1 = require("./BaseRepository");
const Unit_1 = __importDefault(require("../models/Unit"));
class UnitRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(Unit_1.default);
    }
}
exports.UnitRepository = UnitRepository;
//# sourceMappingURL=UnitRepository.js.map