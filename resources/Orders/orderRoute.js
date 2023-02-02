import { createOrder, getAllOrder } from "./orderController.js";
import { isAuthenticatedUser, authorizeRoles } from "../../middlewares/auth.js";
import express from 'express'
const router = express.Router()

router.route("/order/create").post(isAuthenticatedUser, authorizeRoles("admin"), createOrder)
router.route("/order/getAll").get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrder)

// router.route("/product/getAll/").get(getAllProduct)

export default router;