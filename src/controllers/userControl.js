import User from "../models/user.js";
// import models from "../models"
import bcrypt from "bcryptjs"

export const userdata = async (req, resp) => {
  try {
    console.log("Get all user data");
    const data = await User.find();
    resp.status(200).send(data);
  } catch (error) {
    resp.status(400).send(error);
  }
};

export const signup = async (req, resp) => {
  try {
    console.log("signup is called");
    if (req?.body?.pass == req?.body?.cpass) {
      // await models.User.create(req?.body)
      // const user = new User(req.body);
      await User.create(req?.body)
      resp.status(200).send("Registration successfully done....");
    } else {
      console.log("Passward and confirm password is not match!!!");
      resp.status(404).send("Passward and confirm password is not match!!!");
    }
  } catch (error) {
    resp.status(400).send(error);
  }
};

export const edituser = async (req, resp) => {
  try {
    console.log(req.body);

    const user = await User.findByIdAndUpdate(req?.params?.id, {
      name: req.body.name,
      email: req.body.email,
    });
    //resp.status(404).send("User not found")
    resp.status(200).send(user);
  } catch (error) {
    console.log(error);
    resp.status(400).send(error);
  }
};

export const deleteuser = async (req, resp) => {
  try {
    console.log(req.params.id);
    const user = await User.findByIdAndDelete(req.params.id);
    resp.status(200).send(user);
  } catch (error) {
    console.log(error);
  }
};
