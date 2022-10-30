import { Router } from "express";

import { AddInformationService } from "../services/AddInformationService";
import { NewConnectionService } from "../services/NewConnectionService";
import { informations, clients } from "../repositories/Respositories";

const informationsRoutes = Router();

informationsRoutes.get("/", (request, response) => {
  const newConnectionService = new NewConnectionService();
  newConnectionService.execute(informations, clients, response, request);
});

informationsRoutes.post("/", (request, response) => {
  const addInformationService = new AddInformationService();
  addInformationService.execute(clients, informations, response, request);
});

informationsRoutes.get("/last", (request, response) => {
  response.send(informations);
});

export { informationsRoutes };
