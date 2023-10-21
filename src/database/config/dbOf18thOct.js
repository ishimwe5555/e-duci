import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import config from './config.js';
import mysql from 'mysql';

// Create a Sequelize instance and define the database connection parameters
const sequelize = new Sequelize('schules1_educidb', 'schules1_admin', 'cpanel_test2+new+page', {
  host: 'vm1035.tmdcloud.eu',
  dialect: 'mysql',
});

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the database.');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });

export default sequelize;
