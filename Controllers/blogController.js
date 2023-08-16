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
exports.generateUniqueId = exports.getLatestFeed = exports.getPostsForAuthors = exports.createPostControl = exports.postCommentControl = void 0;
const dbControl_1 = require("./dbControl");
const crypto_1 = __importDefault(require("crypto"));
const Response_1 = __importDefault(require("../Tools/Response"));
const ERR = 'There was an issue, please try again later';
const BATCH_SIZE = 10;
const postCommentControl = (author, text, postID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, dbControl_1.postComment)(author, postID, text);
        return response;
    }
    catch (error) {
        console.log(error);
        return new Response_1.default(500, ERR, error);
    }
});
exports.postCommentControl = postCommentControl;
const createPostControl = (author, content, title, time) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postID = generateUniqueId(author, content, title, time);
        const response = yield (0, dbControl_1.createPost)(author, content, title, time, postID);
        return response;
    }
    catch (error) {
        console.log(error);
        return new Response_1.default(500, ERR, error);
    }
});
exports.createPostControl = createPostControl;
const getPostsForAuthors = (author, reqCount, batch) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, dbControl_1.getAuthorPosts)(author, reqCount, batch);
        return response;
    }
    catch (error) {
        console.log(error);
        return new Response_1.default(500, ERR, error);
    }
});
exports.getPostsForAuthors = getPostsForAuthors;
const getLatestFeed = (reqCount, batch) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, dbControl_1.getLatestPosts)(reqCount, batch);
        return response;
    }
    catch (error) {
        console.log(error);
        return new Response_1.default(500, ERR, error);
    }
});
exports.getLatestFeed = getLatestFeed;
function generateUniqueId(author, content, title, time) {
    const data = author + content + title + time.toString();
    const hash = crypto_1.default.createHash('sha256').update(data).digest('hex');
    return hash;
}
exports.generateUniqueId = generateUniqueId;
