"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'C:/tripper/tripper/temp');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + Date.now() + file.originalname.match(/\..*$/)[0]);
    }
});
exports.upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 1 * 1024 * 1024 * 10 },
});
//# sourceMappingURL=fileUpload.js.map