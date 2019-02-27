import { Schema, model } from 'mongoose';

const UserModel = new Schema({
  email: String,
  password: String,
});

export default model('User', UserModel);
