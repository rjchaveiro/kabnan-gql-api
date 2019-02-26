import { Schema, model } from "mongoose";

const CardModel = new Schema({
  client: String,
  reference: String,
  description: String,
  tier: String,
  columnId: String
});

export default model("Card", CardModel);
