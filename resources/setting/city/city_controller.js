import mongoose from "mongoose";
import { City } from "./city_model.js";
import {
  addEntity,
  deleteEntity,
  getEntity,
  updateEntity,
} from "../../../Utils/reusableApi.js";

const getNewId = async (req, res) => {
  try {
    const newId = new mongoose.Types.ObjectId();
    res.status(200).json({ status: "OK", data: { _id: newId } });
  } catch (err) {
    return res.status(500).json({ message: "Unable to get ID." });
  }
};

const addCity = async (req, res) => {
  await addEntity(req, res, City);
};

const getCityById = async (req, res) => {
  await getEntity(req, res, City);
};

const getCityByIdWithState = async (req, res) => {
  try {
    const city = await City.findById(req.params.id).populate("state");
    res.status(200).json(city);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

const getAllCities = async (req, res) => {
  try {
    const cities = await City.find({}).populate("state");
    res.status(200).json({ data: cities });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

const updateCity = async (req, res) => {
  await updateEntity(req, res, City);
};

const deleteCityById = async (req, res) => {
  await deleteEntity(req, res, City);
};

export {
  getNewId,
  addCity,
  getAllCities,
  getCityById,
  updateCity,
  deleteCityById,
  getCityByIdWithState,
};
