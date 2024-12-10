"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dbconfig_1 = require("./dbconfig");
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
}));
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/v1/", routes_1.default);
dbconfig_1.sequlize.sync({ alter: true, force: false }).then(() => {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
});
//# sourceMappingURL=index.js.map