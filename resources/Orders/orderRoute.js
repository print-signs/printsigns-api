import { createOrder, deleteOneOrder, EditOrderBeforePayment, getAllOrder, getSingleOrder } from "./orderController.js";
import { isAuthenticatedUser, authorizeRoles } from "../../middlewares/auth.js";
import express from 'express'
const router = express.Router()

router.route("/order/create").post(isAuthenticatedUser, authorizeRoles("admin"), createOrder)
router.route("/order/getAll").get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrder)
router.route("/order/getOne/:id").get(isAuthenticatedUser, authorizeRoles("admin"), getSingleOrder)
router.route("/order/edit/:id").put(isAuthenticatedUser, authorizeRoles("admin"), EditOrderBeforePayment)


router.route("/order/delete/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOneOrder)




// router.route("/product/getAll/").get(getAllProduct)

export default router