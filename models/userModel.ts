import { db } from "../database/database";
import { UserTbl } from "../database/db";

export const fetch = async () => {
  const result = await db.selectFrom("user_tbl").selectAll().execute();
  return result;
};
export const register = async (data: any) => {
  const result = await db.insertInto("user_tbl").values(data).execute();
  return result;
};
export const login = async (email: any) => {
  const result = await db
    .selectFrom("user_tbl")
    .selectAll()
    .where("email", "=", `${email}`)
    .execute();
  return result;
};
