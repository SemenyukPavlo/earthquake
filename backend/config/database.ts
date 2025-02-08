import { DataSource } from "typeorm";
import { Earthquake } from "../entities/Earthquake";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: "postgresql://postgres.lmywhcspmxbhngzqqfzg:cCeMnrsJ9tLqqcT7@aws-0-eu-central-1.pooler.supabase.com:6543/postgres",
  port: 5432,
  entities: [Earthquake],
  synchronize: true,
});
