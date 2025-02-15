import express from "express";
import { connectDB } from "./config/db.js";
import { apiRouter } from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { createAdmin } from "./controllers/adminController.js";
import dotenv from 'dotenv';
dotenv.config();
createAdmin()

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({
  origin: "https://learning-dashboard-client.vercel.app", // ✅ Allow only your frontend
  credentials: true, // ✅ Allow cookies/auth headers
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // ✅ Allow required methods
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"] // ✅ Allow necessary headers
}));


app.use(cookieParser());


connectDB().then(() => {
  console.log("Database connected successfully.");
}).catch((error) => {
  console.error("Database connection error:", error);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})