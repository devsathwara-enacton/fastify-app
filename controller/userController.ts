import { FastifyReply, FastifyRequest } from "fastify";
import { user } from "../models/index";

export const getUsers = async (req: FastifyRequest, reply: FastifyReply) => {
  const users = await user.fetch();
  const data = req.session.get("email");
  if (data != null) {
    reply.status(200).send({
      statusCode: 200,
      data: users,
    });
  } else {
    reply.send("Please login");
  }
};

export const register = async (req: FastifyRequest, reply: FastifyReply) => {
  const { email, password }: any = req.body;
  if (!email || !password) {
    return reply.status(400).send({
      statusCode: 400,
      message: "Missing required fields",
    });
  } else {
    const userExist = await user.login(email);
    if (userExist.length > 0) {
      return reply.status(409).send({
        statusCode: 409,
        message: "User already exists.",
      });
    } else {
      let data = { email: email, password: password };
      const users = await user.register(data);
      reply.status(200).send({
        statusCode: 200,
        success: true,
        message: "Register Successful",
      });
    }
  }
};

export const login = async (req: FastifyRequest, reply: FastifyReply) => {
  const { email, password }: any = req.body;
  if (!email || !password) {
    return reply.status(400).send({
      statusCode: 400,
      message: "Missing required fields",
    });
  } else {
    const userExist = await user.login(email);
    if (userExist.length > 0) {
      // Set a session variable
      req.session.set("email", email);

      return reply.status(200).send({
        statusCode: 200,
        success: true,
        message: "Login Successful",
      });
    } else {
      return reply.status(409).send({
        statusCode: 409,
        message: "User does not exist, please register",
      });
    }
  }
};
export const logout = async (req: FastifyRequest, reply: FastifyReply) => {
  req.session.delete();
  reply.send("logged out");
};
