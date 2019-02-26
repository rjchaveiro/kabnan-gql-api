import { Schema, model } from 'mongoose';

const BookModel = new Schema({
  name: String,
  genre: String,
  authorId: String,
});

export default model('Book', BookModel);
