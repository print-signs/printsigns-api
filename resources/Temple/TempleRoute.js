import { Router } from "express";
const router = Router();
import {
    addTemple,
    getAllTemples,
    getTempleById,
    updateTemple,
    deleteTempleById,
    getTempleByIdWithoutPopulate,
    getAllTemplesPopulated,
    // getAllTemplesPopulatedWithOption,
    addProductToTemple,
    // addGradeToTemple,
    getTempleByIdPopulated,
} from "./Temple_controller.js";
import { authorizeRoles, isAuthenticatedUser } from "../../middlewares/auth.js";

router.get("/", getAllTemples);
router.get("/withpopulate", isAuthenticatedUser, getAllTemplesPopulated);
// router.get("/withpopulate/:option", getAllTemplesPopulatedWithOption);
router.get("/withoutpopulate/:id", isAuthenticatedUser, getTempleByIdWithoutPopulate);
router.get("/:id", isAuthenticatedUser, getTempleById);
router.get("/arrayspopulate/:id", getTempleByIdPopulated);
router.post("/", isAuthenticatedUser, authorizeRoles("admin"), addTemple);
router.patch("/product/:id", isAuthenticatedUser, addProductToTemple);
// router.patch("/grade/:id", addGradeToTemple);
router.patch("/:id", isAuthenticatedUser, authorizeRoles("admin"), updateTemple);
router.delete("/:id", isAuthenticatedUser, authorizeRoles("admin"), deleteTempleById);

export default router;
