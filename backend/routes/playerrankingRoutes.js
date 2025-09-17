import { Router } from "express";
import { Create, Get, Update, Delete, GetCountries } from "../controllers/playerrankingController.js";

const router = Router();

router.post("/create", Create);
router.get("/get", Get);
router.get("/get-countries", GetCountries);

router.put("/update/:id", Update);
router.delete("/delete/:id", Delete);

export default router;
