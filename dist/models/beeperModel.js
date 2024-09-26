"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeeperStatus = void 0;
var BeeperStatus;
(function (BeeperStatus) {
    BeeperStatus[BeeperStatus["manufactured"] = 0] = "manufactured";
    BeeperStatus[BeeperStatus["assembled"] = 1] = "assembled";
    BeeperStatus[BeeperStatus["shipped"] = 2] = "shipped";
    BeeperStatus[BeeperStatus["deployed"] = 3] = "deployed";
})(BeeperStatus || (exports.BeeperStatus = BeeperStatus = {}));
