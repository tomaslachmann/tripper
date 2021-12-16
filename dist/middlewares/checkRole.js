"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = void 0;
const checkRole = (roles) => {
    return async (res) => {
        res.status(200).send(roles);
    };
};
exports.checkRole = checkRole;
//# sourceMappingURL=checkRole.js.map