import { Router } from "express";
const router = Router();
import {
  getNewId,
  addCity,
  getAllCities,
  getCityById,
  updateCity,
  deleteCityById,
  getCityByIdWithState,
} from "./city_controller.js";

router.get("/newid", getNewId);
router.get("/", getAllCities);
router.get("/:id", getCityById);
router.get("/withstate/:id", getCityByIdWithState);
router.post("/", addCity);
router.patch("/:id", updateCity);
router.delete("/:id", deleteCityById);

export default router;
