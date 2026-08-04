import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import router from "../src/routes/index.routes.js";

const app = express();

// Set CORS headers on ALL responses including preflight OPTIONS and error responses
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const MONGODB_URI = process.env.MONGODB || "mongodb+srv://joseignacioledesmapadilla_db_user:TpEKMYE5Uo1zxQNx@cluster0.jls24lq.mongodb.net/dbAgendaEntrenamiento";

app.use(async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 8000,
      });
    }
    next();
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
    return res.status(500).json({ error: "Error de conexión a la base de datos", detail: err.message });
  }
});

app.use("/api", router);
app.use("/", router);

export default app;
