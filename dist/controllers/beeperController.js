"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBeepersByStatus = exports.deleteBeeper = exports.updateBeeperStatus = exports.createBeeper = exports.getBeeperById = exports.getAllBeeppers = void 0;
const beeperService = __importStar(require("../services/beeperService"));
const getAllBeeppers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beepers = yield beeperService.getBeeperService();
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
        const beeper = yield beeperService.getBeeperByIdService(beeperId);
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
        const beeperName = req.body.name;
        const newBeeper = yield beeperService.creatBeeperService(beeperName);
        res.status(201).json({ newBeeper });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed creating beeper in the database' });
    }
});
exports.createBeeper = createBeeper;
const updateBeeperStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beeperId = req.params.id;
        const beeperStatus = req.body.status;
        if (beeperStatus === "deployed") {
            const beeperLet = req.body.letitude;
            const beeperLon = req.body.longitude;
            const beeper = yield beeperService.updateBeeperStatusService(beeperId, beeperStatus, beeperLet, beeperLon);
            if (beeper === -1) {
                return res.status(404).json({ error: 'Beeper not found' });
            }
            res.status(200).json(beeper);
        }
        const beeper = yield beeperService.updateBeeperStatusService(beeperId, beeperStatus);
        if (beeper === -1) {
            return res.status(404).json({ error: 'Beeper not found' });
        }
        res.status(200).json(beeper);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed updating beeper in the database' });
    }
});
exports.updateBeeperStatus = updateBeeperStatus;
const deleteBeeper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beeperId = req.params.id;
        const deletedBeeper = yield beeperService.deleteBeeperService(beeperId);
        if (deletedBeeper === -1) {
            return res.status(404).json({ error: 'Beeper not found' });
        }
        res.status(204).send();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed deleting beeper from the database' });
    }
});
exports.deleteBeeper = deleteBeeper;
const getBeepersByStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beeperStatus = req.params.status;
        const filterBeepers = yield beeperService.getBeepersByStatusService(beeperStatus);
        res.status(200).json(filterBeepers);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed reading beepers from the database' });
    }
});
exports.getBeepersByStatus = getBeepersByStatus;
