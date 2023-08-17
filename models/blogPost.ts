import mongoose, { Document, Schema } from 'mongoose';

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
  comments: IComment[];
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
  comments: [commentSchema],
});

const BlogPost = mongoose.model<IBlogPost>('BlogPost', blogPostSchema, 'Posts');

export default BlogPost;
