import express from "express";
import { deleteuser, edituser, signup, userdata } from "../controllers/userControl.js";

const router = new express.Router();

router.get("/", userdata);

router.post("/signup", signup);

router.put("/useredit/:id", edituser);

router.delete("/deleteuser/:id", deleteuser)

export default router;
