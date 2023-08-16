import mongoose, { Document, Model, Schema } from "mongoose";

interface IUser extends Document {
  author: string;
  memeberSince: string;
}

const userSchema = new Schema<IUser>({
  author: {
    type: String,
    minlength: 2,
    required: true,
    unique: true,
  },
  memeberSince: {
    type: String,
    default: new Date().toLocaleDateString(),
  },
});

const UserModel: Model<IUser> = mongoose.model<IUser>("user", userSchema);

export default UserModel;
