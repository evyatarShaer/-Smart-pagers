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
exports.updateBeeper = exports.createBeeper = exports.getBeeperById = exports.getAllBeeppers = void 0;
const jsonfile_1 = __importDefault(require("jsonfile"));
const path_1 = __importDefault(require("path"));
const beepersFile = path_1.default.join(__dirname, '../../src/data/db.json');
const getAllBeeppers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beepers = yield jsonfile_1.default.readFile(beepersFile);
        res.status(200).json(beepers);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed reading beepers from the database' });
    }
});
exports.getAllBeeppers = getAllBeeppers;
const getBeeperById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beeperId = req.params.id;
        const beepers = yield jsonfile_1.default.readFile(beepersFile);
        const beeper = beepers.find((beeper) => beeper.id === beeperId);
        if (!beeper) {
            return res.status(404).json({ error: 'Beeper not found' });
        }
        res.status(200).json(beeper);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed reading beeper from the database' });
    }
});
exports.getBeeperById = getBeeperById;
const createBeeper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body.Status = "manufactured";
        const newBeeper = req.body;
        const beepers = yield jsonfile_1.default.readFile(beepersFile);
        beepers.push(newBeeper);
        yield jsonfile_1.default.writeFile(beepersFile, beepers);
        res.status(201).json(newBeeper);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed creating beeper in the database' });
    }
});
exports.createBeeper = createBeeper;
const updateBeeper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beeperId = req.params.id;
        const beeperStatus = req.params.BeeperStatus;
        const beepers = yield jsonfile_1.default.readFile(beepersFile);
        const index = beepers.findIndex((beeper) => beeper.id === beeperId);
        if (index === -1) {
            return res.status(404).json({ error: 'Beeper not found' });
        }
        beepers[index].status = beeperStatus;
        yield jsonfile_1.default.writeFile(beepersFile, beepers);
        res.status(200).json(beeperStatus);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed updating beeper in the database' });
    }
});
exports.updateBeeper = updateBeeper;
