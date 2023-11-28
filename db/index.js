import mongoose from "mongoose";

export const db = () =>
  mongoose.connect(process.env.DB_URL).then(() => {
    console.log("DB Connected");
  }).catch((err) =>{
    console.log(err);
  })
