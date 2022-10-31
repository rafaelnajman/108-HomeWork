import { Response, Request } from "express";
import { Client } from "../model/Client";
import { repositories } from "../repositories/Repositories";

class AddInformationService {
  verifyAltitude(altitude: String) {
    return Number(altitude) >= 0 && Number(altitude) <= 3000 && altitude != "";
  }
  verifyHSI(hsi: String) {
    return Number(hsi) >= 0 && Number(hsi) <= 360 && hsi != "";
  }
  verifyADI(adi: String) {
    return Number(adi) >= -100 && Number(adi) <= 100 && adi != "";
  }

  sendEventsToAll(newInformation, clients: Client[]) {
    clients.forEach((client) =>
      client.response.write(`data: ${JSON.stringify(newInformation)}\n\n`)
    );
  }

  /**
   * This method is responsible for adding new data to the repository, verifying the data and sending it to all connected clients
   *@param response - response from the request
   *@param request - request from the client
   *@param repository - instance of the repository
   */
  execute(response: Response, request: Request, repository: repositories) {
    const data: IData = request.body;
    //verify if data is valid and not empty
    if (
      this.verifyAltitude(data.altitude) &&
      this.verifyHSI(data.hsi) &&
      this.verifyADI(data.adi)
    ) {
      response.status(201).send();
      repository.setInformations(data);
      console.log(repository.getInformations());
      return this.sendEventsToAll(
        repository.getInformations(),
        repository.getClients()
      );
    }
    response.status(400).send({ message: "the values are not valid" });
  }
}

export { AddInformationService };
