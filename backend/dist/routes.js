"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwt_1 = require("./jwt");
const UserController_1 = require("./controllers/UserController");
const router = (0, express_1.Router)();
router.get("/user/auth-status", jwt_1.authenticateToken, UserController_1.checkAuthStatus);
router.post("/user/login", UserController_1.login);
router.post("/user/logout", UserController_1.logout);
router.post("/user/register", UserController_1.register);
exports.default = router;
//# sourceMappingURL=routes.js.map