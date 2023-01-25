import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TemperatureReadingSchema = new Schema({
  device: {
    type: Schema.Types.ObjectId,
    ref: "Device",
    required: true,
  },
  parameter: { type: String, default: "temperature" },
  temperature: {
    type: Number,
    required: true,
    trim: true,
  },
  uid: {
    type: String,
    
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const TemperatureReading = mongoose.model(
  "TemperatureReading",
  TemperatureReadingSchema
);

export default TemperatureReading;
