import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { informationsRoutes } from "./routes/informations.routes";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(informationsRoutes);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
