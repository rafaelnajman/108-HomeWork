import express, { Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

type IData = {
  altitude: string;
  hsi: string;
  adi: string;
};

type Client = {
  id: Number;
  response: Response;
};

var informations: IData;

var clients: Client[] = [];

//send events to all clients
function sendEventsToAll(newInformation) {
  clients.forEach((client) =>
    client.response.write(`data: ${JSON.stringify(newInformation)}\n\n`)
  );
}

async function addInformation(request, response: Response, next) {
  var data: IData = request.body;
  //TODO: look for optimal way to do this
  //verify if data is valid and not empty
  if (
    data.altitude &&
    data.hsi &&
    data.adi &&
    data.altitude != "" &&
    data.hsi != "" &&
    data.adi != "" &&
    Number(data.altitude) >= 0 &&
    Number(data.hsi) >= 0 &&
    Number(data.adi) >= -100 &&
    Number(data.altitude) <= 3000 &&
    Number(data.hsi) <= 360 &&
    Number(data.adi) <= 100
  ) {
    response.status(201).send();
    informations = { ...data };
    console.log(informations);
    return sendEventsToAll(informations);
  }
  response.status(400).send({ message: "the values are not valid" });
}

app.post("/", addInformation);

function eventsHandler(request, response: Response, next) {
  response.writeHead(200, {
    //SSE headers
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  const data = ` ${JSON.stringify(informations)}\n\n`;

  response.write(data);

  const clientId = request.get("host");

  clients.push({ id: clientId, response });

  request.on("close", () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter((client) => client.id !== clientId);
  });
}

app.get("/", eventsHandler);
app.get("/last", (request, response) => {
  response.send(informations);
});
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
