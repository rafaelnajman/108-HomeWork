import { Response, Request } from "express";

import { Client } from "../model/Client";

import { repositories } from "../repositories/Repositories";

class NewConnectionService {
  /**
   * This method is responsible for opening a new SSE connection and adding the client to the repository
   *@param response - response from the request
   *@param request - request from the client
   *@param repository - instance of the repository
   */
  execute(response: Response, request: Request, repository: repositories) {
    response.writeHead(200, {
      //SSE headers
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });

    const data = ` ${JSON.stringify(repository.getInformations())}\n\n`;

    response.write(data);

    const clientId = new Date().getTime();

    repository.addClient(new Client(clientId, response));

    request.on("close", () => {
      console.log(`${clientId} Connection closed`);
      repository.removeClient(new Client(clientId, response));
    });
  }
}
export { NewConnectionService };
