import { Router } from "express";
import { getData, getDataForFilter, getDataForGraph } from "../controllers/data.controller.js";

const router = Router();

router.get("/getdata", getData);
router.get("/getdataforfilter", getDataForFilter);
router.get("/getdataforgraph", getDataForGraph);


export default router;
