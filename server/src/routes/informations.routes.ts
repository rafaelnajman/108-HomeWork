import { Router } from "express";

import { AddInformationService } from "../services/AddInformationService";
import { NewConnectionService } from "../services/NewConnectionService";
import { repositories } from "../repositories/Repositories";

const informationsRoutes = Router();
const repository = repositories.getInstance();

//route to open a new SSE connection
informationsRoutes.get("/", (request, response) => {
  const newConnectionService = new NewConnectionService();
  newConnectionService.execute(response, request, repository);
});

//route to receive new data and send to all clients
informationsRoutes.post("/", (request, response) => {
  const addInformationService = new AddInformationService();
  addInformationService.execute(response, request, repository);
});

//route to send information
informationsRoutes.get("/last", (request, response) => {
  console.log(repository.getInformations());
  response.send(repository.getInformations());
});

export { informationsRoutes };
