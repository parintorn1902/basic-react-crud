import dotenv from "dotenv";

dotenv.config();

const Config = {
  SECRET_KEY: {
    ACCESS_TOKEN: process.env.SECRET_KEY_A,
    REFRESH_TOKEN: process.env.SECRET_KEY_B,
    COOKIE: process.env.SECRET_KEY_C,
  },
  DB: {
    URL: process.env.DB_URL,
    NAME: process.env.DB_NAME,
    USERNAME: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    PORT: process.env.DB_PORT,
    POOL_SIZE: process.env.DB_POOL_SIZE,
  },
};

export default Config;
