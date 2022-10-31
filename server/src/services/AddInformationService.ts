import { Response, Request } from "express";
import { Client } from "../model/Client";
import { repositories } from "../repositories/Respositories";

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

  execute(response: Response, request: Request) {
    const data: IData = request.body;
    //verify if data is valid and not empty
    if (
      this.verifyAltitude(data.altitude) &&
      this.verifyHSI(data.hsi) &&
      this.verifyADI(data.adi)
    ) {
      response.status(201).send();
      repositories.getInstance().setInformations(data);
      console.log(repositories.getInstance().getInformations());
      return this.sendEventsToAll(
        repositories.getInstance().getInformations(),
        repositories.getInstance().getClients()
      );
    }
    response.status(400).send({ message: "the values are not valid" });
  }
}

export { AddInformationService };
