import { model, Schema } from "mongoose";

const blogSchema = new Schema({
  title: String,
  body: String,
});

export const BlogModel = model("Blog", blogSchema);