import { Schema, model } from 'mongoose';

const ColumnModel = new Schema({
  name: String,
});

export default model('Column', ColumnModel);
