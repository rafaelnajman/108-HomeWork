import { Response, Request } from "express";

import { Client } from "../model/Client";

import { repositories } from "../repositories/Respositories";

class NewConnectionService {
  execute(response: Response, request: Request) {
    response.writeHead(200, {
      //SSE headers
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });

    const data = ` ${JSON.stringify(
      repositories.getInstance().getInformations()
    )}\n\n`;

    response.write(data);

    const clientId = new Date().getTime();

    repositories.getInstance().setClient(new Client(clientId, response));

    request.on("close", () => {
      console.log(`${clientId} Connection closed`);
      repositories.getInstance().removeClient(new Client(clientId, response));
    });
  }
}
export { NewConnectionService };
