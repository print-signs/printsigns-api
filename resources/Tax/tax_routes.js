import { Router } from "express";
import { authorizeRoles, isAuthenticatedUser } from "../../middlewares/auth.js";
import {
  addTax,
  updateTax,
  deleteTax,
  getTaxes,
  getTax,
} from "./tax_controller.js";
const router = Router();

router.route("/add_tax").post(isAuthenticatedUser, authorizeRoles("admin"), addTax);
router.route("/update_tax/:id").patch(isAuthenticatedUser, authorizeRoles("admin"), updateTax);
router.route("/delete_tax/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteTax);
router.route("/view_tax/:id").get(isAuthenticatedUser, getTax);
router.route("/view_tax").get(isAuthenticatedUser, getTaxes);
export default router;
