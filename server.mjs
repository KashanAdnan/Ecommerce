import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDatabase from "./database/conection.mjs";
import userRoute from "./routes/user.routes.mjs";
import productRoute from "./routes/product.routes.mjs";
import cookieParser from "cookie-parser";
import {
  v2 as cloudinary
} from 'cloudinary';
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
  origin: "*",
  credentials: true
}));
app.use(cookieParser());

cloudinary.config({
  cloud_name: 'dkm9huflw',
  api_key: '459957364119957',
  api_secret: 'f-k_UHnz1NX5XM9Iq_Pev_hL8PY'
});

connectDatabase(process.env.MONGODB_URI);
app.use("/api/v1", userRoute);
app.use("/api/v2", productRoute);

app.listen(3000, () => {
  console.log(`Server is Running ${3000}`);
});