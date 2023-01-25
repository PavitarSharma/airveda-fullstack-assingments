import Device from "../models/device.model.js";
import TemperatureReading from "../models/temperatureReading.model.js";
import HumidityReading from "../models/humidityReading.model.js";
import mongoose from "mongoose";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

export const createDevice = async (req, res, next) => {
  try {
    // const data = new Device({
    //   name: req.body.name,
    //   uid: new mongoose.Types.ObjectId(),
    // });

    const device = new Device({
      uid: req.body.uid,
      name: req.body.name,
    });

    await device.save();
    const temperatureReading = new TemperatureReading({
      device: device._id,
      temperature: req.body.temperature,
      uid: device.uid,
    });

    await temperatureReading.save();

    const humidityReading = new HumidityReading({
      device: device._id,
      humidity: req.body.humidity,
      uid: device.uid,
    });
    await humidityReading.save();

    const devices = {
      name: device.name,
      uid: device.uid,
    };

    res.status(201).json({
      success: true,
      device: devices,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSingleDevice = async (req, res, next) => {
  try {
    const device = await Device.findOne({ uid: req.params.uid });
    if (!device) {
      return res.status(404).json({ message: "Device not found" });
    }

    res.status(200).json({
      success: true,
      device,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllDevices = async (req, res, next) => {
  try {
    const devices = await Device.find();

    if (devices.length === 0) {
      res.status(404).json({
        success: false,
        message: "Not found devices",
      });
    }

    res.status(200).json({
      success: true,
      devices,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteDevice = async (req, res, next) => {
  try {
    const device = await Device.findOneAndRemove({ uid: req.params.uid });
    if (!device) {
      return res.status(404).json({ message: "Device not found" });
    }
    res.status(200).json({ message: "Device deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getReadingData = async (req, res) => {
  try {
    const device = await Device.findOne({ uid: req.params.uid });
    if (!device) {
      return res.status(404).json({ message: "Device not found" });
    }
    if (!moment(req.query.start_on, "YYYY-MM-DDTHH:mm:ss").isValid()) {
      return res.status(400).json({
        message:
          "Invalid start_on date format. Please use the format YYYY-MM-DDTHH:mm:ss",
      });
    }
    if (!moment(req.query.end_on, "YYYY-MM-DDTHH:mm:ss").isValid()) {
      return res.status(400).json({
        message:
          "Invalid end_on date format. Please use the format YYYY-MM-DDTHH:mm:ss",
      });
    }
    const start_on = moment(req.query.start_on, "YYYY-MM-DDTHH:mm:ss").toDate();
    const end_on = moment(req.query.end_on, "YYYY-MM-DDTHH:mm:ss").toDate();
    let readings = null;
    if (req.params.parameter === "temperature") {
      readings = await TemperatureReading.find({
        device: device._id,
        timestamp: { $gte: start_on, $lt: end_on },
        parameter: req.params.parameter,
      });
    } else if (req.params.parameter === "humidity") {
      readings = await HumidityReading.find({
        device: device._id,
        timestamp: { $gte: start_on, $lt: end_on },
        parameter: req.params.parameter,
      });
    }
    if (!readings) {
      return res.status(404).json({
        message: "No readings found for the given device in the given period.",
      });
    }
    res.status(200).json({
      success: true,
      readings,
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

export const getDeviceGraph = async (req, res) => {
  try {
    const deviceId = req.query.device_uid;
    const temperatureReadings = await TemperatureReading.find({
      uid: deviceId,
    });
    const humidityReadings = await HumidityReading.find({ uid: deviceId });
    res.status(200).json({
      success: true,
      temperatureReadings,
      humidityReadings,
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
