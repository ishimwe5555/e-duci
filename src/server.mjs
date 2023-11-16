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
import http from 'http';
import { Server } from 'socket.io';
import options from './docs/apidoc.mjs';
import router from './routes/index.mjs';
import { errorHandler } from './middleware/index.mjs';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

dotenv.config();
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

const serverInstance = server.listen(PORT);

io.listen(serverInstance);

export default serverInstance;
