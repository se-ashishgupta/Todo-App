import express from "express";
import {
  getAllUsers,
  getmyProfile,
  register,
  login,
  logout,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all", getAllUsers);
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

router.get("/me", isAuthenticated, getmyProfile);

//OR
// router.get("/userid/:id", getuserDetails);
// router.put("/userid/:id", updateUser);
// router.delete("/userid/:id", deleteUser);

export default router;
