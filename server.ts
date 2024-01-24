import fastify, { FastifyInstance } from "fastify";
import fastifyCookie from "@fastify/cookie";
import fastifySecureSession from "@fastify/secure-session";
const app: FastifyInstance = fastify({ logger: true });
app.register(fastifyCookie);
app.register(fastifySecureSession, {
  secret: "averylogphrasebiggerthanthirtytwochars",
  salt: "mq9hDxBVDbspDR6n",
  sessionName: "session",
  cookieName: "session",
  cookie: {
    path: "/",
    httpOnly: true,
    // expires: new Date(Date.now() + 3600000),
    expires: new Date(Date.now() + 60000), // 1 hour in milliseconds
  },
});

// Register your routes
app.register(import("./routes/userRoutes"), { prefix: "/api" });

app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`Server running on ${address}`);
});
