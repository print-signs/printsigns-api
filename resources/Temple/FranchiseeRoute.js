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
    FranchiseeLogin,
    franchiseeForgotPassword,
    franchiseeUpdatePassword,
    getFransiDetails,
    EditFranchiseeProfile,
} from "./Franchisee_controller.js";
import { authorizeRoles, isAuthenticatedUser, isFranchiAuthenticated } from "../../middlewares/auth.js";
import { FranchiseeVarificationFromAdmin } from "./Franchisee_controller.js";
import { FranchiseePriceLevelProduct } from "./Franchisee_controller.js";

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
//varify
router.get("/admin/verify/:id", isAuthenticatedUser, authorizeRoles("admin"), FranchiseeVarificationFromAdmin);


// ---------franchisee Auth ----------------------////////
franchiseeForgotPassword
router.post("/login", FranchiseeLogin);
router.post("/password/forgot", franchiseeForgotPassword)
router.get("/getDetails/me", isFranchiAuthenticated, getFransiDetails);
router.patch("/edit/self", isFranchiAuthenticated, EditFranchiseeProfile);


router.route("/password/update").put(isFranchiAuthenticated, franchiseeUpdatePassword);
//fetch product franchisee Wise
router.route("/product/price_level").get(isFranchiAuthenticated, FranchiseePriceLevelProduct);







export default router;
