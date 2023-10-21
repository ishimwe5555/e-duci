# E-duci backend application

[![HoundCI](https://img.shields.io/badge/style--blue.svg?label=HoundCI&logo=eslint&style=flat)](https://houndci.com) [![CircleCI](https://dl.circleci.com/status-badge/img/gh/atlp-rwanda/Team-Sostene-E-commerce-bn/tree/develop.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/atlp-rwanda/Team-Sostene-E-commerce-bn/tree/develop) [![Coverage Status](https://coveralls.io/repos/github/atlp-rwanda/Team-Sostene-E-commerce-bn/badge.svg?branch=develop)](https://coveralls.io/github/atlp-rwanda/Team-Sostene-E-commerce-bn?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/484e0e60c2f2168ac6f0/maintainability)](https://codeclimate.com/github/atlp-rwanda/Team-Sostene-E-commerce-bn/maintainability)  [![Test Coverage](https://api.codeclimate.com/v1/badges/484e0e60c2f2168ac6f0/test_coverage)](https://codeclimate.com/github/atlp-rwanda/Team-Sostene-E-commerce-bn/test_coverage)

# This is the back-end of E-duci website

## Setup

1. Go to the project root directory
2. Create an `.env` file for the variables
3. Run `npm install`
4. Run `npm start` to start the project

## Dependencies
- express
- dotenv
- bodyParser
- pg
- sequelize
- babel
- passport
- passport-google-oauth20
- passport-stub
- cors
- passport-local
- bcrypt
- redis
- joi

## DevDependencies
- mocha
- chai
- chai-http
- nyc
- prettier
- eslint
- husky
- sinon
- swagger-ui-express
- swagger-jsdoc
- pg
- pg-hstore
- morgan
- chai
- chai-http
- nyc

## Hound 
- HoundCI is a code review tool that automatically reviews code changes for potential errors and issues.<br>It can be integrated into the continuous integration and delivery (CI/CD) process <br> to ensure that code changes are thoroughly reviewed before they are deployed to production

- In summary, HoundCI is a helpful tool for automating code review and ensuring the quality of code changes in a software development project.

## NodeMailer
- Nodemailer is a tool that simplifies the process of sending transactional emails in eCommerce websites. It supports various email services and offers useful features such as email templates, file attachments, and HTML emails.

# PostgreSQL Installation

Make sure PostgreSQL is installed on your machine. You can download and install it from the official website: https://www.postgresql.org/download/.

## Environment Variables

Create a .env file in the root directory of your project and set the NODE_ENV environment variable to development. You can also set any other environment variables you need in this file. Below is the .env configuration keys, you can add the correct values for your database connection.
```

PORT = ''
DEV_DATABASE_URL = ''
POSTGRES_DIALECT = ''
TEST_DATABASE_URL = ''
DATABASE_URL = ''
NODE_ENV = ''
PORT=''
GOOGLE_CLIENT_ID=''
GOOGLE_CLIENT_SECRET=''
EXPRESS_SESSION_SECRET=''
JWT_SECRET=''
SWAGGER_URL='' 
DEV_DATABASE_URL=''
TEST_DATABASE_URL=''
DATABASE_URL=''
ENV=''
SSL=''
PRODUCTION_URL=''
REDIS_URL= ''
NODE_MAILER_USER=''
NODE_MAILER_PASS=''
RESET_PASSWORD_KEY=''
HOST_MAILER=''

```

### Running Migrations:

To create the Users table in your PostgreSQL database, run the following command in your terminal:
```

npx sequelize-cli db:migrate

```
This will execute the migration files in the db/migrations folder and create the Users table in your PostgreSQL database.
