import jwt from "jsonwebtoken";
import User from "../models/user.js";
import mongoose from "mongoose";

export const auth = async (req, resp, next) => {
  try {
    const myToken = req?.cookies?.jwt
    const verifyToken = jwt.verify(myToken, process.env.S_KEY)
    if (verifyToken) {
      const userData = await User.findOne({_id: verifyToken._id})
      req.User = userData
      req.token = myToken
      next()
    }
  } catch (error) {
    resp.send(error);
  }
};
