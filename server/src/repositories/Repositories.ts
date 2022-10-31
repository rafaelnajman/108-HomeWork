import { Client } from "../model/Client";

/**
 * This class is responsible for storing the clients and the data using the Singleton pattern
 * @param clients - array of clients
 * @param informations - object with the data
 * @param instance - instance of the repository
 * @method addClient - add a new client to the repository
 * @method removeClient - remove a client from the repository
 * @method getClients - return the array of clients
 * @method setInformations - set the data in the repository
 * @method getInformations - return the data
 * @method getInstance - return the instance of the repository
 */
class repositories {
  private clients: Client[] = [];
  private informations: IData = {
    altitude: "",
    hsi: "",
    adi: "",
  };

  private static INSTANCE: repositories;

  private constructor() {}

  public static getInstance(): repositories {
    if (!repositories.INSTANCE) {
      repositories.INSTANCE = new repositories();
    }
    return repositories.INSTANCE;
  }
  addClient(client: Client) {
    this.clients.push(client);
  }
  getClients() {
    return this.clients;
  }
  removeClient(client: Client) {
    this.clients = this.clients.filter((c) => c.getId() !== client.getId());
  }

  getInformations() {
    return this.informations;
  }

  setInformations(informations: IData) {
    this.informations = informations;
  }
}

export { repositories };
