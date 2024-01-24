import dotenv from "dotenv";

dotenv.config();

export const config = {
  env: {
    app: {
      database: process.env.DATABASE_NAME,
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      port: process.env.DATABASE_PORT,
    },
  },
};
