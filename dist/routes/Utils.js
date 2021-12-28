"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const utilsController_1 = __importDefault(require("../controllers/utilsController"));
const router = (0, express_1.Router)();
router.post("/country", utilsController_1.default.getCountry);
exports.default = router;
//# sourceMappingURL=Utils.js.map