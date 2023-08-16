"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Response {
    constructor(status, message, data = null) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}
exports.default = Response;
