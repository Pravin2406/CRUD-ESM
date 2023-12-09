import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  pass: { type: String, require: true },
  tokens: [{ token: { type: String, require: true } }],
});

// userSchema.pre("save", async function () {
//   try {
//     console.log("----->", this.isModified("pass"));
//     if (this.isModified("pass")){
//       this.pass = await bcrypt.hash(this.pass, 12);
//     };
//   } catch (error) {}
// });

userSchema.pre("save", async function () {
  try {
    if (this.isModified("pass")) {
      this.pass = await bcrypt.hash(this.pass, 12);
    }
  } catch (error) {
    console.log(error);
  }
});

userSchema.methods.generateToken = async function () {
  try {
    const token = jwt.sign({ _id: this._id }, process.env.S_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    console.log(error);
  }
};

export default new mongoose.model("User", userSchema);
