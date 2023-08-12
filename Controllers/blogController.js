const mongoose = require("mongoose");

const db = require("./dbControl");



const postComment = async (author,postID,text) => {
    const response = await db.postComment(author,postID,text);
    res.json(response);
    
}
    


  module.exports = {postComment}