"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const RequestController_1 = __importDefault(require("../controllers/RequestController"));
const checkJwt_1 = require("../middlewares/checkJwt");
const router = (0, express_1.Router)();
router.get("/", RequestController_1.default.get);
router.post("/handle", [checkJwt_1.checkJwt], RequestController_1.default.handle);
exports.default = router;
//# sourceMappingURL=request.js.map