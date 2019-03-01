import { Schema, model } from 'mongoose';

const ColumnModel = new Schema({
  name: String,
  userID: String,
});

export default model('Column', ColumnModel);
