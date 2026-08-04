import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import router from "./src/routes/index.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const MONGODB_URI = process.env.MONGODB || "mongodb+srv://joseignacioledesmapadilla_db_user:TpEKMYE5Uo1zxQNx@cluster0.jls24lq.mongodb.net/dbAgendaEntrenamiento";

let isConnected = false;
app.use(async (req, res, next) => {
  if (!isConnected && mongoose.connection.readyState < 1) {
    try {
      await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
      isConnected = true;
    } catch (err) {
      console.error("MongoDB Error:", err);
    }
  }
  next();
});

app.use("/api", router);

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Servidor ejecutandose en http://localhost:${PORT}`));
}

export default app;
