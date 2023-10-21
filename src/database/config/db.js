import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import config from './config.js';

dotenv.config();

const env = process.env.NODE_ENV;

const db = config[env];

const dbConfig = {
  dialect: process.env.DB_DIALECT,
 // logging: false, // if you want logs
};

if (process.env.SSL === 'true') {
  dbConfig.dialectOptions = {
    connectTimeout: 80000, // set to 60 seconds
    logging: false,
    ssl : {
        rejectUnauthorized: false
      }
  };
}
// const sequelize = new Sequelize(db.url, dbConfig);
// Create a Sequelize instance and define the database connection parameters
const sequelize = new Sequelize(db.DATABASE, db.USER, db.PASSWORD, {
  host: db.HOST,
  dialect: 'mysql',
  port: 3306,
});

sequelize.authenticate();

export default sequelize;
