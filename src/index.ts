import express, { Handler } from "express";
import carRouter from "./routes/cars/controller";
import winnersRouter from "./routes/winners/controller";
import "dotenv/config";

const PORT = process.env.PORT || 3000;
const app = express();
const rootHandler: Handler = (req, res) => {
  console.log("Request method:", req.method);
  res.send("Exampled response");
};
app.use(express.json());
app.use("/garage", carRouter);
app.use("/winners", winnersRouter);
app.use("/", rootHandler);

app.listen(PORT, () => {
  console.log("Server started in PORT" + PORT);
});
