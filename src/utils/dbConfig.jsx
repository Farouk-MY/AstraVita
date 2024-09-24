import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
const sql = neon("postgresql://astravita_owner:VYrjqCB7zRW9@ep-gentle-wave-a2zx0xb5.eu-central-1.aws.neon.tech/astravita?sslmode=require");
export const db = drizzle(sql, { schema });