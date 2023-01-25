import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import deviceRoutes from "./routes/device.routes.js"

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

// database connecton
mongoose.set('strictQuery', false)
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Database connection successfully done"))
  .catch((error) => console.log(`Database connection error ${error.message}`));

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use("/api", deviceRoutes);

app.listen(PORT, () => console.log(`Server listing on port ${PORT}...`))
