import '@babel/polyfill';
import '@babel/register';
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import session from 'express-session';
import cors from 'cors';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import options from './docs/apidoc.js';
import router from './routes/index.js';
import { errorHandler } from './middleware/index.mjs';
import sockets from './helpers/notifications.js';
import { chats } from './helpers/index.mjs';
// import job from './jobs/index.js';

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

chats.chats(io);
dotenv.config();
sockets(io);
const { PORT } = process.env;

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

const specs = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/', router);

app.use(errorHandler);

const server = app.listen(PORT);

// job.CroneJobs();

// job.cron();

io.listen(server);

export default server;
