import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import router from "../src/routes/index.routes.js";

const app = express();

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(morgan("dev"));

const MONGODB_URI = process.env.MONGODB || "mongodb+srv://joseignacioledesmapadilla_db_user:TpEKMYE5Uo1zxQNx@cluster0.jls24lq.mongodb.net/dbAgendaEntrenamiento";

app.use(async (req, res, next) => {
  if (req.method === "OPTIONS") return next();
  
  if (mongoose.connection.readyState !== 1) {
    try {
      await mongoose.connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 5000,
      });
    } catch (err) {
      console.error("MongoDB Connection Error:", err);
      return res.status(500).json({ error: "Error de conexión a la base de datos", detail: err.message });
    }
  }
  next();
});

app.use("/api", router);
app.use("/", router);

export default app;
