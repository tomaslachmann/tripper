"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const utilts_1 = __importDefault(require("../queries/utilts"));
class UtilsController {
}
_a = UtilsController;
UtilsController.getCountry = async (req, res) => {
    const { searchText } = req.body;
    const utilsRepository = utilts_1.default;
    let countries;
    try {
        const response = await utilsRepository.getCountry(searchText);
        countries = response;
    }
    catch (error) {
        res.status(401).send(error);
        return;
    }
    res.send({
        countries: countries
    });
};
exports.default = UtilsController;
//# sourceMappingURL=utilsController.js.map