import { Response, Request } from "express";
import { Client } from "../model/Client";

class AddInformationService {
  verifyAltitude(altitude: String) {
    if (Number(altitude) >= 0 && Number(altitude) <= 3000 && altitude != "") {
      return true;
    }
    return false;
  }
  verifyHSI(hsi: String) {
    if (Number(hsi) >= 0 && Number(hsi) <= 360 && hsi != "") {
      return true;
    }
    return false;
  }
  verifyADI(adi: String) {
    if (Number(adi) >= -100 && Number(adi) <= 100 && adi != "") {
      return true;
    }
    return false;
  }

  public execute(
    clients: Client[],
    informations: IData,
    response: Response,
    request: Request
  ) {
    var data: IData = request.body;
    //TODO: look for optimal way to do this
    //verify if data is valid and not empty
    if (
      this.verifyAltitude(data.altitude) &&
      this.verifyHSI(data.hsi) &&
      this.verifyADI(data.adi)
    ) {
      response.status(201).send();
      informations = { ...data };
      console.log(informations);
      return this.sendEventsToAll(informations, clients);
    }
    response.status(400).send({ message: "the values are not valid" });
  }
  sendEventsToAll(newInformation, clients: Client[]) {
    clients.forEach((client) =>
      client.response.write(`data: ${JSON.stringify(newInformation)}\n\n`)
    );
  }
}

export { AddInformationService };
