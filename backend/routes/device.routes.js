import express from "express";
import {
  createDevice,
  deleteDevice,
  getAllDevices,
  getDeviceGraph,
  getReadingData,
  getSingleDevice,
} from "../controllers/device.controller.js";

const router = express.Router();

router.post("/devices", createDevice);

router.get("/devices", getAllDevices);

router.get("/devices/:uid", getSingleDevice);

router.delete("/devices/:uid", deleteDevice);

router.get("/devices/:uid/readings/:parameter", getReadingData);

router.get("/devices-graph", getDeviceGraph);

export default router;
