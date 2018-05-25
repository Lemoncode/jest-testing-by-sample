"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = () => ({
    post: (req, res) => {
        isValidLogin(req.body.login, req.body.password) ?
            res.sendStatus(201) :
            res.sendStatus(401);
    },
});
const isValidLogin = (login, password) => (login === 'admin' &&
    password === 'test');

//# sourceMappingURL=controller.js.map
