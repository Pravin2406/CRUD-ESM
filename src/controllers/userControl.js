import User from "../models/user.js";
// import models from "../models"  //if we create "index" export file in model then we can use this type
import bcrypt from "bcryptjs";

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
      await User.create(req?.body);
      resp.status(200).send("Registration successfully done....");
    } else {
      console.log("Passward and confirm password is not match!!!");
      resp.status(404).send("Passward and confirm password is not match!!!");
    }
  } catch (error) {
    resp.status(400).send(error);
  }
};

export const login = async (req, resp) => {
  try {
    console.log("login is calling...");
    let { email, pass } = req?.body;
    const matchUser = await User.findOne({ email: email });
    if (matchUser) {
      let isMatchPass = await bcrypt.compare(pass || "", matchUser.pass);
      if (isMatchPass) {
        console.log("ismatchpass is calling");
        // let userToken = jwt.sign({ id: matchUser._id }, process.env.S_KEY);
        let userToken = await matchUser.generateToken();
        resp.cookie("jwt", userToken);
        resp.status(200).send({ data: "Login is successfully", userToken });
      } else {
        resp.status(400).send("Invalid credentials");
      }
    } else {
      resp.status(400).send("User not found");
    }
  } catch (error) {
    console.log(error);
    // resp.status(400).send(error);
  }
};

export const logoutUser = async (req, resp) => {
  try {
    const user = req.User;
    const token = req.token;
    user.tokens = user.tokens.filter((ele) => {
      return ele.token != token;
    });
    await user.save();
    resp.clearCookie("jwt");
    resp.status(200).send("Logout successfully");
  } catch (error) {
    resp.status(400).send(error);
  }
};

export const logoutAll = async (req, resp) => {
  try {
    console.log("logout all calling...");
    const user = req.User;
    const token = req.token;

    user.tokens = []
    await user.save()
    resp.status(200).send("You are logout from all successfully....")
  } catch (error) {
    resp.status(400).send(error)
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

export const forgotPass = async (req, resp) => {
  try {
    let { email, newPass, newComPass } = req?.body;
    const matchUser = await User.findById(req?.params?.id);
    // const isEmailValid = await User.findOne(email);
    console.log(matchUser, newPass, newComPass);

    if (matchUser && matchUser.email == email) {
      if (newPass == newComPass) {
        newPass = await bcrypt.hash(newPass, 12);
        await User.findByIdAndUpdate(matchUser._id, { pass: newPass });
        resp.status(200).send("Password successfuly update");
      } else {
        resp.status(404).send("New password and confirm password is not match");
      }
    } else {
      resp.status(404).send("User not found");
    }
  } catch (error) {}
};
