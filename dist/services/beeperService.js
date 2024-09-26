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
exports.getBeepersByStatusService = exports.deleteBeeperService = exports.updateBeeperStatusService = exports.getBeeperByIdService = exports.getBeeperService = exports.creatBeeperService = void 0;
const uuid_1 = require("uuid");
const jsonfile_1 = __importDefault(require("jsonfile"));
const path_1 = __importDefault(require("path"));
const beeperModel_1 = require("../models/beeperModel");
const beepersFile = path_1.default.join(__dirname, '../../src/data/db.json');
const creatBeeperService = (beeperName) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield jsonfile_1.default.readFile(beepersFile);
    const newBeeper = {
        id: (0, uuid_1.v4)(),
        name: beeperName,
        status: beeperModel_1.BeeperStatus.manufactured,
        created_at: new Date(),
        detonated_at: null,
        letitude: -1,
        longitude: -1
    };
    beepers.push(newBeeper);
    yield jsonfile_1.default.writeFile(beepersFile, beepers);
    return newBeeper;
});
exports.creatBeeperService = creatBeeperService;
const getBeeperService = () => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield jsonfile_1.default.readFile(beepersFile);
    return beepers;
});
exports.getBeeperService = getBeeperService;
const getBeeperByIdService = (beeperId) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield jsonfile_1.default.readFile(beepersFile);
    return beepers.find((beeper) => beeper.id === beeperId);
});
exports.getBeeperByIdService = getBeeperByIdService;
const updateBeeperStatusService = (beeperId, beeperStatus, beeperLet, beeperLon) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield jsonfile_1.default.readFile(beepersFile);
    const index = beepers.findIndex((beeper) => beeper.id === beeperId);
    if (index === -1) {
        return -1;
    }
    beepers[index].status = beeperStatus;
    if (beeperStatus === "deployed") {
        beepers[index].letitude = Number(beeperLet);
        beepers[index].longitude = Number(beeperLon);
        const Detonated = (beeper) => {
            beeper.status = beeperModel_1.BeeperStatus.Detonated;
            beeper.detonated_at = new Date();
            beeper.letitude = -1;
            beeper.longitude = -1;
        };
        const timer = setInterval(() => {
            Detonated(beepers[index]);
        }, 10000);
        clearInterval(timer);
    }
    yield jsonfile_1.default.writeFile(beepersFile, beepers);
    return beepers[index];
});
exports.updateBeeperStatusService = updateBeeperStatusService;
const deleteBeeperService = (beeperId) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield jsonfile_1.default.readFile(beepersFile);
    const index = beepers.findIndex((beeper) => beeper.id === beeperId);
    if (index === -1) {
        return -1;
    }
    beepers.splice(index, 1);
    yield jsonfile_1.default.writeFile(beepersFile, beepers);
    return beepers[index];
});
exports.deleteBeeperService = deleteBeeperService;
const getBeepersByStatusService = (beeperStatus) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield jsonfile_1.default.readFile(beepersFile);
    const filterBeepers = beepers.filter((beeper) => beeper.status == beeperStatus);
    return filterBeepers;
});
exports.getBeepersByStatusService = getBeepersByStatusService;
