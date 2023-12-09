import "dotenv/config";
import express, { response } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./src/routers/userRouter.js";

const app = express();
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", router);
// app.post("/signup", (req,resp) => {
//   console.log(req.body);
//   resp.send("success")
// })

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
