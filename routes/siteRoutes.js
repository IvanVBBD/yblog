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
// src/routes.ts
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const siteRouter = express_1.default.Router();
const path = require('path');
//body parser configs
siteRouter.use(body_parser_1.default.json());
siteRouter.use(body_parser_1.default.urlencoded({
    extended: true
}));
const urlencodedParser = body_parser_1.default.urlencoded({
    extended: false
});
//Outcomes
const OK = 200;
const ERR = 500;
const DENIED = 403;
const BATCH = 10;
// Get a user's blog posts with comments
siteRouter.get('/', urlencodedParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.sendFile(path.join(__dirname, '../views/index.html'));
}));
exports.default = siteRouter;
