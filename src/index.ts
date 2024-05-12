import express, { Handler } from "express";
import carRouter from "./routes/cars/controller";
import winnersRouter from "./routes/winners/controller";
import "dotenv/config";
import cors, { CorsOptions } from "cors";
import engineRouter from "./routes/engine/controller";

const PORT = process.env.PORT || 3000;
const corsOptions: CorsOptions = {
  origin: [
    "http://192.168.43.5",
    "https://async-race-delta.vercel.app",
    // "http://localhost:5173",
  ],
  credentials: true,
  allowedHeaders: "*",
  exposedHeaders: "*",
};

const app = express();

const rootHandler: Handler = (req, res) => {
  console.log("Request method:", req.method);
  res.send("Exampled response");
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/garage", carRouter);
app.use("/winners", winnersRouter);
app.use("/engine", engineRouter);
app.use("/", rootHandler);

app.listen(PORT, () => {
  console.log("Server started in PORT" + PORT);
});
