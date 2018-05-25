"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
exports.loginRouter = () => {
    const router = express_1.Router();
    const controller = controller_1.LoginController();
    router.route('/')
        .post(controller.post);
    return router;
};

//# sourceMappingURL=router.js.map
