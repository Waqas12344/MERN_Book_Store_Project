import express, { request, response } from "express";
import mongoose from "mongoose";
import { PORT, URL } from "./config.js";
import booksRoute from "./routes/booksRoute.js"
import cors from "cors"
const app = express();

app.use(express.json());

app.use(cors());
// app.use(
//   cors({
//     origin:"http://localhost:3000",
//     methods:['GET','POST','PUT','DELETE'],
//     allowedHeaders:["Content-Type"],
//   })
// );
app.get("/", (req, res) => {
  return res.status(232).send("Welcome to MERN stack project");
});

app.use("/books",booksRoute);


mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected successfully to MongoDB");
    
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });
