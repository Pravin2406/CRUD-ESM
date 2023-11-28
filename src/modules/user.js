import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  pass: { type: String, require: true },
});

export default new mongoose.model("User", userSchema);


