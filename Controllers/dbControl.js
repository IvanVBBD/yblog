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
exports.createUser = exports.getLatestPosts = exports.getAuthorPosts = exports.createPost = exports.postComment = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const blogPost_1 = __importDefault(require("../models/blogPost"));
const user_1 = __importDefault(require("../models/user"));
const Response_1 = __importDefault(require("../Tools/Response"));
//local testing uri
const uri = "mongodb://0.0.0.0:27017/blogPost";
const hostedURI = "mongodb+srv://admin:admin@yblog.thdiw8i.mongodb.net/?retryWrites=true&w=majority";
mongoose_1.default.connect(hostedURI);
const db = mongoose_1.default.connection;
db.on("error", (err) => console.error(err.message));
db.once("connected", () => console.log("Connected to db"));
// CONSTANTS
const SUCCESS_POST = "Successfully inserted";
const SUCCESS_PATCH = "Successfully updated";
const SUCCESS_DELETE = "Successfully deleted";
const SUCCESS_GET = "Successfully retrieved";
const FAIL_POST = "Failed to insert";
const FAIL_PATCH = "Failed to update";
const FAIL_DELETE = "Failed to delete";
const FAIL_GET = "Failed to retrieve";
const postComment = (author, text, postID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedPost = yield blogPost_1.default.findOneAndUpdate({ postID: postID }, // Find the document based on the 'postID' field
        {
            $push: { comments: { text, author } },
        }, { new: true });
        // don't necessarily need updated post returned unless we want specifics
        return new Response_1.default(200, SUCCESS_POST, updatedPost);
    }
    catch (e) {
        console.log(e);
        return new Response_1.default(500, FAIL_POST, e);
    }
});
exports.postComment = postComment;
const createPost = (author, content, title, time, postID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPost = yield blogPost_1.default.create({
            title,
            content,
            author,
            time,
            postID,
        });
        return new Response_1.default(200, SUCCESS_POST, newPost);
    }
    catch (error) {
        console.log(error);
        return new Response_1.default(500, FAIL_POST, error);
    }
});
exports.createPost = createPost;
const getAuthorPosts = (author, reqCount, batch) => __awaiter(void 0, void 0, void 0, function* () {
    if (reqCount <= 0) {
        reqCount = 1;
    }
    try {
        const posts = yield blogPost_1.default.find({ author: author }).skip(reqCount).sort('-createdAt').limit(batch);
        return new Response_1.default(200, SUCCESS_GET, posts);
    }
    catch (error) {
        return new Response_1.default(500, FAIL_POST, error);
    }
});
exports.getAuthorPosts = getAuthorPosts;
const getLatestPosts = (reqCount, batch) => __awaiter(void 0, void 0, void 0, function* () {
    if (reqCount <= 0) {
        reqCount = 1;
    }
    try {
        // skipping to choose those not yet fetched, without it gets the same 10 posts
        const skip = (reqCount - 1) * batch;
        const latestPosts = yield blogPost_1.default
            .find()
            .skip(skip)
            .sort({ createdAt: -1 }) // Sort by createdAt in descending order to get the latest posts
            .limit(batch) // Limit the number of results to the specified count
            .exec();
        return new Response_1.default(200, SUCCESS_GET, latestPosts);
    }
    catch (e) {
        console.log(e);
        return new Response_1.default(500, FAIL_POST, e);
    }
});
exports.getLatestPosts = getLatestPosts;
const createUser = (author, TMSTAMP) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.create({
            author,
            TMSTAMP
        });
        return new Response_1.default(200, SUCCESS_POST, user);
    }
    catch (error) {
        console.log(error);
        return new Response_1.default(500, FAIL_POST, error);
    }
});
exports.createUser = createUser;
