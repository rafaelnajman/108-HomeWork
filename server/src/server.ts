import express from "express";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());

type response = {
  altitude: number;
  his: number;
  adi: number;
};

var informations: response;

app.post("/", (req, res) => {
  res.send("Hello World!");
  var data: response = req.body;
  console.log(data);
  informations = { ...data };
});

app.get("/", (req, res) => {
  res.send(informations);
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
