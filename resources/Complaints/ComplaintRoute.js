
import express from 'express'
import { isAuthenticatedUser, authorizeRoles } from "../../middlewares/auth.js";
import { AddNewComplaint, FindAllComplaint } from './ComplaintController.js';

const router = express.Router()

router.route("/new").post(isAuthenticatedUser, AddNewComplaint)
router.route("/getAll").get(isAuthenticatedUser, authorizeRoles("admin"), FindAllComplaint)






// router.route("/product/getAll/").get(getAllProduct)

export default router