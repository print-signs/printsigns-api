import { Router } from "express";
const router = Router();
import {
    addFranchisee,
    getAllFranchisees,
    getFranchiseeById,
    updateFranchisee,
    deleteFranchiseeById,
    getFranchiseeByIdWithoutPopulate,
    getAllFranchiseesPopulated,
    // getAllFranchiseesPopulatedWithOption,
    addProductToFranchisee,
    // addGradeToFranchisee,
    getFranchiseeByIdPopulated,
} from "./Franchisee_controller.js";
import { authorizeRoles, isAuthenticatedUser } from "../../middlewares/auth.js";

router.get("/", getAllFranchisees);
router.get("/withpopulate", isAuthenticatedUser, getAllFranchiseesPopulated);
// router.get("/withpopulate/:option", getAllFranchiseesPopulatedWithOption);
router.get("/withoutpopulate/:id", isAuthenticatedUser, getFranchiseeByIdWithoutPopulate);
router.get("/:id", isAuthenticatedUser, getFranchiseeById);
router.get("/arrayspopulate/:id", getFranchiseeByIdPopulated);
router.post("/", isAuthenticatedUser, authorizeRoles("admin"), addFranchisee);
router.patch("/product/:id", isAuthenticatedUser, addProductToFranchisee);
// router.patch("/grade/:id", addGradeToFranchisee);
router.patch("/:id", isAuthenticatedUser, authorizeRoles("admin"), updateFranchisee);
router.delete("/:id", isAuthenticatedUser, authorizeRoles("admin"), deleteFranchiseeById);

export default router;
