"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.informationsRoutes = void 0;
const express_1 = require("express");
const AddInformationService_1 = require("../services/AddInformationService");
const NewConnectionService_1 = require("../services/NewConnectionService");
const Respositories_1 = require("../repositories/Respositories");
const informationsRoutes = (0, express_1.Router)();
exports.informationsRoutes = informationsRoutes;
informationsRoutes.get("/", (request, response) => {
    const newConnectionService = new NewConnectionService_1.NewConnectionService();
    newConnectionService.execute(Respositories_1.informations, Respositories_1.clients, response, request);
});
informationsRoutes.post("/", (request, response) => {
    const addInformationService = new AddInformationService_1.AddInformationService();
    addInformationService.execute(Respositories_1.clients, Respositories_1.informations, response, request);
});
informationsRoutes.get("/last", (request, response) => {
    response.send(Respositories_1.informations);
});
//# sourceMappingURL=informations.routes.js.map