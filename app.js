import dotenv from "dotenv";
import express from "express";
const app = express();
import bodyParser from "body-parser";
import fileUpload from "express-fileupload"; // important pkg for file upload
import cors from "cors";
import cookieParser from "cookie-parser";

// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

//handdle cores
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

//auth
import user from "./resources/user/userRoute.js";
import ProductRouter from "./resources/Products/ProductRoute.js";
//Businesses
// import BusinessRoute from "./resources/Businesses/BusinessRoute.js";

import orderRoute from "./resources/Orders/orderRoute.js";
import DepartureRouter from "./resources/Departure/DepartureRoute.js";
import InformationRoute from "./resources/Informations/InformationRoute.js";
import Testimonial from "./resources/Testimonials/TestimonialRoute.js";
import ContactRequest from "./resources/ContactRequests/ContactRequestRoute.js";

import StateRouter from "./resources/setting/state/state_routes.js";
//
import LanguageRoute from "./resources/setting/Language/language_routes.js";
//purpose
import PurposeRoute from "./resources/setting/Purpose/Purpose_routes.js";
// Design Router
import designRoute from "./resources/Design/designRouter.js";
// category Route
import categoryRoute from "./resources/Category/categoryRoutes.js";
import ContentRoute from "./resources/Content/ContentRoutes.js";
import UserAddressRoute from "./resources/userAddress/useAddressRoute.js";
//business_Type
// import Business_TypeRoute from "./resources/setting/Business_Type/Business_routes.js";

import ConfigRouter from "./resources/setting/Configration/Config_routes.js";

import TaxRouter from "./resources/Tax/tax_routes.js";
//specialties
import SpecialtiesRouter from "./resources/Specialties/SpecialtiesRoute.js";

//short urls
// import ShortUrlRouter from "./resources/Businesses/Short_Urls/ShortUrlRoute.js";

app.use("/api/v1/", user);

//Product
app.use("/api", ProductRouter);
//businesses
// app.use("/api/businesses", BusinessRoute);
// Design
app.use("/api/design", designRoute);
// Category
app.use("/api/category", categoryRoute);
// Content
app.use("/api/content", ContentRoute);
// User Address
app.use("/api/user-address", UserAddressRoute);
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
//language
app.use("/api/language", LanguageRoute);
//Purpose
app.use("/api/purpose", PurposeRoute);
//Business_Type
// app.use("/api/business", Business_TypeRoute);
//Tax
app.use("/api/tax", TaxRouter);
//config
app.use("/api/config", ConfigRouter);
//config specialty
// app.use("/api/config/specialty", SpecialtiesRouter);
//specialties
// app.use("/api/specialist", SpecialistRouter);
//appointments
// app.use("/api/appointment", AppointmentRouter);
//short urls
// app.use("/api/shorturl", ShortUrlRouter);

export default app;
