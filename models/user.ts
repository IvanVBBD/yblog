import mongoose, { Document, Model, Schema } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  author: string;
  memeberSince: string;
  img: string;
}

const userSchema = new Schema<IUser>({
  username:{
    type: String,
    minLength: 4,
    required: true,
    unique: true
  },
  email:{
    type:String,
    required: true,
    unique: true
  },
  author: {
    type: String,
    minlength: 2,
    required: true
  },
  memeberSince: {
    type: String,
    default: () => new Date().toLocaleDateString(),
  },
  img: {
    type: String
  }
});

const UserModel: Model<IUser> = mongoose.model<IUser>("user", userSchema);

export default UserModel;
