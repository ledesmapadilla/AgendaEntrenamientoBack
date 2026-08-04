import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import "colors";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, "../../.env");

if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, "utf-8");
  envConfig.split("\n").forEach((line) => {
    const [key, ...value] = line.split("=");
    if (key && value.length > 0) {
      process.env[key.trim()] = value.join("=").trim();
    }
  });
}

const MONGODB_URI = process.env.MONGODB || "mongodb+srv://joseignacioledesmapadilla_db_user:TpEKMYE5Uo1zxQNx@cluster0.jls24lq.mongodb.net/dbAgendaEntrenamiento";

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.info(
      `Base de datos ${mongoose.connection.name.green} conectada exitosamente`,
    );
  } catch (error) {
    console.error("Error conectando a MongoDB Atlas:", error.message);
  }
}

connectDB();

export default mongoose;
