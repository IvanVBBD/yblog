import mongoose, { Document, Schema } from "mongoose";

export interface IComment extends Document {
  text: string;
  author: string;
  createdAt: Date;
}

export interface IBlogPost extends Document {
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  postID: string;
  likes: number; // New property for likes
  likedBy: string[];
  comments: IComment[];
  updateLikes: (author: string) => Promise<void>;
}

const commentSchema = new Schema<IComment>({
  text: String,
  author: String,
  createdAt: { type: Date, default: Date.now },
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
    author: string
  ) {
    const authorIndex = this.likedBy.indexOf(author);
  
  if (authorIndex === -1) {
    // Author not in likedBy array, so add the like
    this.likedBy.push(author);
    this.likes = this.likes + 1;
  } else {
    // Author already in likedBy array, so remove the like
    this.likedBy.splice(authorIndex, 1);
    this.likes = this.likes - 1;
  }
  await this.save();
  };

const BlogPost = mongoose.model<IBlogPost>("BlogPost", blogPostSchema, "Posts");

export default BlogPost;
