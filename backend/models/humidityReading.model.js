import mongoose from "mongoose";
const Schema = mongoose.Schema;

const HumidityReadingSchema = new Schema({
  device: {
    type: Schema.Types.ObjectId,
    ref: "Device",
    required: true,
  },
  humidity: {
    type: Number,
    required: true,
    trim: true
  },
  uid: {
    type: String,
    
    
  },
  parameter: { type: String, default: "humidity" },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const HumidityReading = mongoose.model(
  "HumidityReading",
  HumidityReadingSchema
);

export default HumidityReading;
