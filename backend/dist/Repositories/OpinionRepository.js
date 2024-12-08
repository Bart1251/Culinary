"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpinionRepository = void 0;
const BaseRepository_1 = require("./BaseRepository");
const Opinion_1 = __importDefault(require("../models/Opinion"));
class OpinionRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(Opinion_1.default);
    }
}
exports.OpinionRepository = OpinionRepository;
//# sourceMappingURL=OpinionRepository.js.map