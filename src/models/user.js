import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  pass: { type: String, require: true },
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
  } catch (error) {}
});

export default new mongoose.model("User", userSchema);
