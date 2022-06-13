
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

//express file upload 
app.use(fileUpload({
    useTempFiles: true
}));

//auth
import user from "./routes/userRoute.js"
app.use("/api", user);
//category
import category from "./routes/categoryRoute.js"
app.use("/api", category);
//directory
import directory from "./routes/directoryRoute.js"
app.use("/api", directory);
//News
import news from "./routes/newsRoute.js"
app.use("/api", news);
//Events
import Event from "./routes/EventsRoute.js"
app.use("/api", Event);

export default app;