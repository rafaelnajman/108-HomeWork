"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddInformationService = void 0;
class AddInformationService {
    verifyAltitude(altitude) {
        return Number(altitude) >= 0 && Number(altitude) <= 3000 && altitude != "";
    }
    verifyHSI(hsi) {
        return Number(hsi) >= 0 && Number(hsi) <= 360 && hsi != "";
    }
    verifyADI(adi) {
        return Number(adi) >= -100 && Number(adi) <= 100 && adi != "";
    }
    sendEventsToAll(newInformation, clients) {
        clients.forEach((client) => client.response.write(`data: ${JSON.stringify(newInformation)}\n\n`));
    }
    execute(clients, informations, response, request) {
        const data = request.body;
        //verify if data is valid and not empty
        if (this.verifyAltitude(data.altitude) &&
            this.verifyHSI(data.hsi) &&
            this.verifyADI(data.adi)) {
            response.status(201).send();
            informations = Object.assign({}, data);
            console.log(informations);
            return this.sendEventsToAll(informations, clients);
        }
        response.status(400).send({ message: "the values are not valid" });
    }
}
exports.AddInformationService = AddInformationService;
//# sourceMappingURL=AddInformationService.js.map