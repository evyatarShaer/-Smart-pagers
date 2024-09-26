"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const beeperRoute_1 = __importDefault(require("./routes/beeperRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || "3000";
app.use(express_1.default.json());
app.use(beeperRoute_1.default);
const show = (req, res) => {
    res.status(200).send('smart beepers');
};
app.get('/', show);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
