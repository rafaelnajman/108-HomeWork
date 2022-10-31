import { Router } from "express";

import { AddInformationService } from "../services/AddInformationService";
import { NewConnectionService } from "../services/NewConnectionService";
import { repositories } from "../repositories/Respositories";

const informationsRoutes = Router();

informationsRoutes.get("/", (request, response) => {
  const newConnectionService = new NewConnectionService();
  newConnectionService.execute(response, request);
});

informationsRoutes.post("/", (request, response) => {
  const addInformationService = new AddInformationService();
  addInformationService.execute(response, request);
});

informationsRoutes.get("/last", (request, response) => {
  console.log(repositories.getInstance().getInformations());
  response.send(repositories.getInstance().getInformations());
});

export { informationsRoutes };
