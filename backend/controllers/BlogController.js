import { 
  createBlogService, 
  deleteBlogService, 
  getAllBlogsService, 
  getBlogByIdService, 
  updateBlogService 
} from "../services/index.js";

export const getAllBlogs = async(req, res) => {
  try {
    const blogs = await getAllBlogsService();
    res.status(200).json({ blogs });
  } catch (error) {
    res.status(500).json({ error: error.message});
  }
};

export const getBlogById = async(req, res) => {
  try {
    const blog = await getBlogByIdService(req.params.id);
    res.status(200).json({ blog });
  } catch (error) {
    res.status(500).json({ error: error.message});
  }
};

export const updateBlog = async(req, res) => {
  try {
    const blog = await updateBlogService(req.params.id, req.body);
    res.status(200).json({ blog });
  } catch (error) {
    res.status(500).json({ error: error.message});
  }
};

export const createBlog = async(req, res) => {
  try {
    const blog = await createBlogService(req.body);
    res.status(200).json({ blog });
  } catch (error) {
    res.status(500).json({ error: error.message});
  }
};

export const deleteBlog = async(req, res) => {
  try {
    const blog = await deleteBlogService(req.params.id);
    res.status(200).json({ blog });
  } catch (error) {
    res.status(500).json({ error: error.message});
  }
};