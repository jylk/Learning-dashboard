import express from "express";
import { connectDB } from "./config/db.js";
import { apiRouter } from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { createAdmin } from "./controllers/adminController.js";
import dotenv from "dotenv";

dotenv.config();
createAdmin();

const app = express();
const port = 3000;

// ✅ Place CORS middleware at the very top
app.use(cors({
  origin: "https://learning-dashboard-client.vercel.app", // ✅ Allow only your frontend
  credentials: true, // ✅ Allow cookies/auth headers
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // ✅ Allow necessary methods
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"] // ✅ Allow necessary headers
}));

// ✅ Explicitly handle OPTIONS preflight requests
app.options("*", cors()); 

// ✅ Other middlewares
app.use(express.json());
app.use(cookieParser());

connectDB()
  .then(() => console.log("Database connected successfully."))
  .catch((error) => console.error("Database connection error:", error));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// ✅ Apply CORS middleware to API router as well (if needed)
app.use("/api", cors(), apiRouter);

// ✅ Catch all errors and always send CORS headers
app.use((err, req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://learning-dashboard-client.vercel.app"); // ✅ Explicitly allow frontend origin
  res.status(err.status || 500).json({ error: err.message });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
