import { Response, Request } from "express";

import { Client } from "../model/Client";

class NewConnectionService {
  filterById(id: Number, clients: Client[]) {
    clients = clients.filter((client) => client.getId() !== id);
  }
  execute(
    informations: IData,
    clients: Client[],
    response: Response,
    request: Request
  ) {
    response.writeHead(200, {
      //SSE headers
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });

    const data = ` ${JSON.stringify(informations)}\n\n`;

    response.write(data);

    const clientId = new Date().getTime();

    clients.push(new Client(clientId, response));

    request.on("close", () => {
      console.log(`${clientId} Connection closed`);
      this.filterById(clientId, clients);
    });
  }
}
export { NewConnectionService };
