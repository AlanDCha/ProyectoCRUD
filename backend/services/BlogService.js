import { BlogModel } from "../models/index.js";

export const getAllBlogsService = async() => {
  return await BlogModel.find();
}

export const createBlogService = async(blog) => {
  return await BlogModel.create(blog);
}

export const getBlogByIdService = async(id) => {
  return await BlogModel.findById(id);
}

export const updateBlogService = async(id, blog) => {
  return await BlogModel.findByIdAndUpdate(id, blog);
}

export const deleteBlogService = async(id) => {
  return await BlogModel.findByIdAndDelete(id);
}