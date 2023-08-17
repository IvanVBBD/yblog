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
const express_1 = __importDefault(require("express"));
const userController_1 = require("../Controllers/userController");
const body_parser_1 = __importDefault(require("body-parser"));
const userRouter = express_1.default.Router();
userRouter.use(body_parser_1.default.json());
userRouter.use(body_parser_1.default.urlencoded({
    extended: true
}));
const urlencodedParser = body_parser_1.default.urlencoded({
    extended: false
});
// Outcomes
const OK = 200;
const ERR = 500;
const DENIED = 403;
// Create user
userRouter.post('/create', urlencodedParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const author = req.body.author ? req.body.author.toString() : "";
    try {
        const TMSTAMP = new Date().toLocaleDateString();
        const user = yield (0, userController_1.createUserControl)(author, TMSTAMP);
        if (user.status == OK) {
            res.status(OK).send(user.message);
        }
        else if (user.status == ERR) {
            res.status(ERR).send(user.message);
        }
        else {
            res.status(DENIED).send("Sorry Neh, you failed to can");
        }
    }
    catch (error) {
        res.status(ERR).json({ message: 'Error creating user' });
    }
}));
exports.default = userRouter;
