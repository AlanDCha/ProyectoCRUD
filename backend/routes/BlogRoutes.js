import { Router } from "express";
import { 
  createBlog, 
  deleteBlog, 
  getAllBlogs, 
  getBlogById, 
  updateBlog 
} from "../controllers/index.js";

const router = Router();

router.route("/").get(getAllBlogs).post(createBlog);
router.route("/:id").get(getBlogById).put(updateBlog).delete(deleteBlog);

export { router };