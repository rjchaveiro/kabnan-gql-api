import { Schema, model } from "mongoose";

const AuthorModel = new Schema({
  age: Number,
  name: String,
  gender: String,
  email: String,
  about: String
});

export default model("Author", AuthorModel);
