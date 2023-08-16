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
const blogController_1 = require("../Controllers/blogController");
const body_parser_1 = __importDefault(require("body-parser"));
const blogRouter = express_1.default.Router();
//body parser configs
blogRouter.use(body_parser_1.default.json());
blogRouter.use(body_parser_1.default.urlencoded({
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
blogRouter.post('/', urlencodedParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, author } = req.body;
    const currentTime = new Date();
    try {
        //Response object
        const createdPost = yield (0, blogController_1.createPostControl)(author, content, title, currentTime);
        //can use the data part of the object with the message in order to send the id and the message for the FE component
        if (createdPost.status == OK) {
            //can send data back from response object if we need to
            res.status(OK).send(createdPost.message);
        }
        else if (createdPost.status == ERR) {
            res.status(ERR).send(createdPost.message);
        }
        else {
            res.status(DENIED).send("Sorry Neh, you failed to can");
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating post' });
    }
}));
// Add a comment to a post
blogRouter.post('/comment', urlencodedParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { text, author, postID } = req.body;
    try {
        //Response object
        const updatedPost = yield (0, blogController_1.postCommentControl)(author, postID, text);
        if (updatedPost.status == OK) {
            //can send data back from response object if we need to
            res.status(OK).send(updatedPost.message);
        }
        else if (updatedPost.status == ERR) {
            res.status(ERR).send(updatedPost.message);
        }
        else {
            res.status(DENIED).send("Sorry Neh, you failed to can");
        }
    }
    catch (error) {
        console.error(error);
        res.status(ERR).json({ message: 'Error adding comment' });
    }
}));
// Get a user's blog posts with comments
blogRouter.get('/', urlencodedParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const author = req.query.author ? req.query.author.toString() : "";
    const reqCount = req.query.reqCount ? parseInt(req.query.reqCount.toString()) : 10;
    try {
        const posts = yield (0, blogController_1.getPostsForAuthors)(author, reqCount, BATCH);
        res.json(posts);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching user posts' });
    }
}));
blogRouter.get('/latest', urlencodedParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqCount = req.query.reqCount ? parseInt(req.query.reqCount.toString()) : 10;
    try {
        const posts = yield (0, blogController_1.getLatestFeed)(reqCount, BATCH);
        res.json(posts);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching user posts' });
    }
}));
exports.default = blogRouter;
