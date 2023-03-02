
import dotenv from "dotenv";
import express from 'express'
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
import ProductRouter from "./resources/Products/ProductRoute.js";
import orderRoute from './resources/Orders/orderRoute.js';
import DepartureRouter from "./resources/Departure/DepartureRoute.js";
import InformationRoute from "./resources/Informations/InformationRoute.js";
import Testimonial from "./resources/Testimonials/TestimonialRoute.js";
import ContactRequest from "./resources/ContactRequests/ContactRequestRoute.js"

import StateRouter from "./resources/setting/state/state_routes.js";
import CityRouter from "./resources/setting/city/city_routes.js";
import ConfigRouter from "./resources/setting/Configration/Config_routes.js";
import TaxRouter from "./resources/Tax/tax_routes.js";
app.use("/api/v1/", user);
//Product
app.use("/api", ProductRouter);
//Order
app.use("/api", orderRoute);
//Departure
app.use("/api/departure/", DepartureRouter);
//Information
app.use("/api/information/", InformationRoute);
//Contact Requests
app.use("/api/contact/request/", ContactRequest);
//Complaints
app.use("/api/testimonial/", Testimonial);
//state
app.use("/api/state", StateRouter);
//city
app.use("/api/city", CityRouter);
//Tax
app.use("/api/tax", TaxRouter);
//config
app.use("/api/config", ConfigRouter)

export default app;