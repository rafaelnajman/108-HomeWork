"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewConnectionService = void 0;
const Client_1 = require("../model/Client");
class NewConnectionService {
    filterById(id, clients) {
        clients = clients.filter((client) => client.getId() !== id);
    }
    execute(informations, clients, response, request) {
        response.writeHead(200, {
            //SSE headers
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
        });
        const data = ` ${JSON.stringify(informations)}\n\n`;
        response.write(data);
        const clientId = new Date().getTime();
        clients.push(new Client_1.Client(clientId, response));
        request.on("close", () => {
            console.log(`${clientId} Connection closed`);
            this.filterById(clientId, clients);
        });
    }
}
exports.NewConnectionService = NewConnectionService;
//# sourceMappingURL=NewConnectionService.js.map