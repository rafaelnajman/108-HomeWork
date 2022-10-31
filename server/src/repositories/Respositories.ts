import { Client } from "../model/Client";

//singletone
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
  setClient(client: Client) {
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
