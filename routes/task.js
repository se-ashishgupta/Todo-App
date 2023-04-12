import express from "express";
import {
  newTask,
  getMyTask,
  updateTask,
  deletetask,
} from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", isAuthenticated, newTask);
router.get("/my", isAuthenticated, getMyTask);
router
  .route("/:id")
  .delete(isAuthenticated, deletetask)
  .put(isAuthenticated, updateTask);

export default router;
