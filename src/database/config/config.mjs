import dotenv from 'dotenv';

dotenv.config();
const { DATABASE, DB_USERNAME, DB_PASSWORD, DB_HOST, SSL } = process.env;
const ssl = Boolean(SSL);

const config = {
  development: {
    DATABASE: DATABASE,
    USER: DB_USERNAME,
    PASSWORD: DB_PASSWORD,
    HOST:DB_HOST,
    dialect: 'mysql',
    dialectOptions: {
      ssl: process.env.SSL,
    },
  }
};

export default config;