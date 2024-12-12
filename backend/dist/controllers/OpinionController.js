"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOpinion = void 0;
const OpinionRepository_1 = require("../repositories/OpinionRepository");
const opinionRepository = new OpinionRepository_1.OpinionRepository();
const createOpinion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data: content, userId, recipeId } = req.body;
        yield opinionRepository.create({ content: content, userId: userId, recipeId: recipeId });
        res.status(200).json({ message: "Opinion created successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createOpinion = createOpinion;
//# sourceMappingURL=OpinionController.js.map