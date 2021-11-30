"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = void 0;
const checkRole = (roles) => {
    return async (req, res, next) => {
        const id = res.locals.jwtPayload.userId;
        res.status(200);
    };
};
exports.checkRole = checkRole;
//# sourceMappingURL=checkRole.js.map