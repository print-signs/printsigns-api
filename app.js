
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
import user from "./resources/user/userRoute.js"
app.use("/api/v1/", user);
//Product
import ProductRouter from "./resources/Products/ProductRoute.js";
app.use("/api", ProductRouter);
//Order
import orderRoute from './resources/Orders/orderRoute.js'
app.use("/api", orderRoute);

//Franchisee
import FranchiseeRouter from "./resources/Temple/FranchiseeRoute.js";
app.use("/api/franchisee/", FranchiseeRouter);
//state
import StateRouter from "./resources/setting/state/state_routes.js";
app.use("/api/state", StateRouter);

//city
import CityRouter from "./resources/setting/city/city_routes.js";
app.use("/api/city", CityRouter);
//Tax
import TaxRouter from "./resources/Tax/tax_routes.js";
app.use("/api/tax", TaxRouter);
//config
import ConfigRouter from "./resources/setting/Configration/Config_routes.js";

app.use("/api/config", ConfigRouter)

export default app;