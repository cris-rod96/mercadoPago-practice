import { config } from "dotenv";
config();

const { PORT, DB_URI, ACCESS_TOKEN } = process.env;

console.log(ACCESS_TOKEN);

const configMercadoPago = {
  accessToken: ACCESS_TOKEN,
};

export { PORT, DB_URI, configMercadoPago };
