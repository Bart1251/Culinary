"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepRepository = void 0;
const BaseRepository_1 = require("./BaseRepository");
const Step_1 = __importDefault(require("../models/Step"));
class StepRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(Step_1.default);
    }
}
exports.StepRepository = StepRepository;
//# sourceMappingURL=StepRepository.js.map