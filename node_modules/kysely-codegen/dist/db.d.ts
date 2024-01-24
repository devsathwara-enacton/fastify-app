import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export interface UserTbl {
  email: Generated<string | null>;
  googleId: Generated<string | null>;
  id: Generated<number>;
  password: Generated<string | null>;
}

export interface DB {
  user_tbl: UserTbl;
}
