import { User, Doctor } from "./domains";

export const ormConfig = {
  type: "postgres",
  host: "postgres",
  port: 5432,
  username: "myuser",
  password: "1q2w3e4r",
  database: "mydb",
  entities: [User, Doctor],
  synchronize: true,
};
