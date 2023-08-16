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
exports.createUserControl = void 0;
const dbControl_1 = require("./dbControl");
const Response_1 = __importDefault(require("../Tools/Response"));
const ERR = 'There was an issue, please try again later';
const createUserControl = (author, TMSTAMP) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, dbControl_1.createUser)(author, TMSTAMP);
        return response;
    }
    catch (error) {
        return new Response_1.default(500, ERR, error);
    }
});
exports.createUserControl = createUserControl;
