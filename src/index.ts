import express, { Handler } from "express";

const PORT = process.env.PORT || 3000;
const app = express();
const rootHandler: Handler = (req, res) => {
  console.log("Request method:", req.method);

  res.send("Exampled response");
};
app.use("/", rootHandler);

app.listen(PORT, () => {
  console.log("Server started in PORT" + PORT);
});
