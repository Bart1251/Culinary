"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dbconfig_1 = require("./dbconfig");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use("/v1/", routes_1.default);
const port = 6969;
app.get('/', (req, res) => {
    res.send('Hello World!');
});
dbconfig_1.sequlize.sync({ alter: true, force: false }).then(() => {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
});
//# sourceMappingURL=index.js.map