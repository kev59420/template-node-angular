import { DataSource } from "typeorm";
import { DataSourceOptions } from "typeorm/data-source/DataSourceOptions";

let connectionOptions: DataSourceOptions = {
  type: "postgres" as "postgres", // It could be mysql, mongo, etc
  host: "localhost",
  port: 4600,
  username: "postgres", // postgre username
  password: "postgres", // postgre password
  database: "deboinvest", // postgre db, needs to be created before
  schema: 'deboinvest',
  synchronize: false, // if true, you don't really need migrations
  logging: true,
  entities: ["src/**/*.entity{.ts,.js}"], // where our entities reside
  migrations: ["src/db/migrations/*{.ts,.js}"], // where our migrations reside
};

export default new DataSource({
  ...connectionOptions,
});