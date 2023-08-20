import mongoose, { Document, Schema } from "mongoose";

export interface IComment extends Document {
  text: string;
  author: string;
  username: string;
  createdAt: Date;
  commentID: string;
  likes : number;
  likedBy : string[];
  updateLikes: (username: string) => Promise<void>;
}

export interface IBlogPost extends Document {
  title: string;
  content: string;
  author: string;
  username: string;
  createdAt: Date;
  postID: string;
  likes: number;
  likedBy: string[];
  comments: IComment[];
  updateLikes: (username: string) => Promise<void>;
}

const commentSchema = new Schema<IComment>({
  text: String,
  author: String,
  username: String,
  commentID: String,
  createdAt: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  likedBy: [{ type: String }],
});

const blogPostSchema = new Schema<IBlogPost>({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  content: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 300,
  },
  author: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  postID: {
    type: String,
    required: true,
  },
  likes: { type: Number, default: 0 },
  likedBy: [{ type: String }],
  comments: [commentSchema],
});

blogPostSchema.methods.updateLikes = async function (
  username: string
  ) {
    const usernameIndex = this.likedBy.indexOf(username);
  
  if (usernameIndex === -1) {
    // Author not in likedBy array, so add the like
    this.likedBy.push(username);
    this.likes = this.likes + 1;
  } else {
    // Author already in likedBy array, so remove the like
    this.likedBy.splice(usernameIndex, 1);
    this.likes = this.likes - 1;
  }
  await this.save();
  };

  commentSchema.methods.updateLikes = async function (
    username: string
  ) {
    const usernameIndex = this.likedBy.indexOf(username);
  
  if (usernameIndex === -1) {
    // Author not in likedBy array, so add the like
    this.likedBy.push(username);
    this.likes = this.likes + 1;
  } else {
    // Author already in likedBy array, so remove the like
    this.likedBy.splice(usernameIndex, 1);
    this.likes = this.likes - 1;
  }
  await this.save();
  };

const BlogPost = mongoose.model<IBlogPost>("BlogPost", blogPostSchema, "Posts");

export default BlogPost;
