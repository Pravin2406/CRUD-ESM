import express from "express";
import {
  deleteuser,
  edituser,
  signup,
  userdata,
  login,
  forgotPass,
  logoutUser,
  logoutAll,
} from "../controllers/userControl.js";
import { auth } from "../middleware/auth.js";

const router = new express.Router();

router.get("/", userdata);

router.post("/signup", signup);

router.put("/useredit/:id", edituser);

router.delete("/deleteuser/:id", deleteuser);

router.post("/login", login);

router.get("/logout", auth, logoutUser);

router.get("/logoutAll", auth, logoutAll);

router.put("/forgotPass/:id", forgotPass);

export default router;
