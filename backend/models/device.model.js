import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
const deviceSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    trim: true,
    required: [true, "Device name is required"],
  },
});

const Device = mongoose.model("Device", deviceSchema);

export default Device;
