import { Response } from "express";

class Client {
  private id: Number;
  response: Response;

  constructor(id: Number, response: Response) {
    this.id = id;
    this.response = response;
  }

  getId(): Number {
    return this.id;
  }
}

export { Client };
