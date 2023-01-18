
import dotenv from "dotenv";
import express from 'express';
const app = express();
import bodyParser from "body-parser";
import fileUpload from "express-fileupload"// important pkg for file upload
import cors from 'cors'
import cookieParser from "cookie-parser"

// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());


//handdle cores
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({
    useTempFiles: true
}));

//auth
import user from "./routes/userRoute.js"
app.use("/api/v1/", user);

export default app;