"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBeeppers = void 0;
const jsonfile_1 = __importDefault(require("jsonfile"));
const path_1 = __importDefault(require("path"));
const beepersFile = path_1.default.join(__dirname, '../data/db.json');
const getAllBeeppers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beepers = yield jsonfile_1.default.readFile(beepersFile);
        res.status(200).json(beepers);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error reading beepers from the database.' });
    }
});
exports.getAllBeeppers = getAllBeeppers;
