import { FastifyInstance } from "fastify";
import { users } from "../controller";

export default async function (app: FastifyInstance) {
  app.get("/user/", users.getUsers);
  app.post("/user/register", users.register);
  app.post("/user/login", users.login);
  app.post("/user/logout", users.logout);
}
