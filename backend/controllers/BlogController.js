import { createBlogService, deleteBlogService, getAllBlogsService, getBlogByIdService, updateBlogService } from "../services/index.js";

export const getAllBlogs = async(req, res) => {
  try {
    const blogs = await getAllBlogsService();
    res.json({ data: blogs, status: "success" });
  } catch (error) {
    res.status(500).json({ error: error.message});
  }
};

export const getBlogById = async(req, res) => {
  try {
    const blog = await getBlogByIdService(req.params.id);
    res.json({data: blog, status: "success"});
  } catch (error) {
    res.status(500).json({ error: error.message});
  }
};

export const updateBlog = async(req, res) => {
  try {
    const blog = await updateBlogService(req.params.id, req.body);
    res.json({data: blog, status: "success"});
  } catch (error) {
    res.status(500).json({ error: error.message});
  }
};

export const createBlog = async(req, res) => {
  try {
    const blog = await createBlogService(req.body);
    res.json({data: blog, status: "success"});
  } catch (error) {
    res.status(500).json({ error: error.message});
  }
};

export const deleteBlog = async(req, res) => {
  try {
    const blog = await deleteBlogService(req.params.id);
    res.json({data: blog, status: "success"});
  } catch (error) {
    res.status(500).json({ error: error.message});
  }
};