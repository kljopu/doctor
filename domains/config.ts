import * as path from "path"

export const ormConfig = {
  type: "postgres",
  host: "postgres",
  port: 5432,
  username: "myuser",
  password: "1q2w3e4r",
  database: "mydb",
  entities: [`${path.join(__dirname, "./domains")}/*.entity.[tj]s`],
  synchronize: true,
};